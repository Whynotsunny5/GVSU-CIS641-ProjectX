const express = require("express");
const bodyParser = require("body-parser");
const db = require("./dbConfig");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const { validateEmail, validateUsername, validatePassword } = require('./validation');

  try {
    validateEmail(email);
    validateUsername(username);
    validatePassword(password);

  const existingUser = await db.oneOrNone(
    "SELECT * FROM users WHERE username = $1 OR email = $2",
    [username, email]
  );
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "Username or email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.none(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
    [username, email, hashedPassword]
  );

  res.status(201).json({ message: "User registered successfully" });
} catch (error) {
  console.error("Error during user registration:", error);
  res.status(500).json({ error: "Internal server error" });
}
});
    

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const jwtSecretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      jwtSecretKey,
      {
        expiresIn: "5h",
      }
    );

    res
      .status(200)
      .json({
        message: "Login successful",
        token,
        user: { id: user.id, username: user.username },
      });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/getUserProfile/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profilePicBase64 = user.profile_pic ? Buffer.from(user.profile_pic).toString('base64') : null;

    res.json({ 
      ...user, 
      profilePic: profilePicBase64
    });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getUserProfileById/:uid', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [uid]);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profilePicBase64 = user.profile_pic ? Buffer.from(user.profile_pic).toString('base64') : null;

    res.json({ 
      ...user, 
      profilePic: profilePicBase64
    });
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/updateUserProfile', upload.single('profilePic'), async (req, res) => {
  const { username, email, firstName, lastName, phoneNumber, description } = req.body;
  const profilePicBuffer = req.file ? req.file.buffer : null;
  try {
    await db.none(
      "UPDATE users SET email = $1, first_name = $2, last_name = $3, phone_number = $4, description = $5, profile_pic = $6 WHERE username = $7",
      [email, firstName, lastName, phoneNumber, description, profilePicBuffer, username]
    );
    res.json({ message: 'User profile updated successfully.' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/createPost', upload.single('image'), async (req, res) => {
  console.log("dfsgsd");
  const { userId, title, description, price } = req.body;
  const image = req.file ? req.file.buffer : null;
  const timestamp = new Date();

  try {
    const newPost = await db.one(
      'INSERT INTO posts(user_id, title, description, image, price, created_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      [userId, title, description, image, price, timestamp]
    );
    res.status(201).json({ message: 'Post created successfully', postId: newPost.id });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getPost/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await db.one('SELECT * FROM posts WHERE id = $1', postId);

    const imageBase64 = post.image ? Buffer.from(post.image).toString('base64') : null;

    res.json({
      ...post,
      image: imageBase64
    });
  } catch (error) {
    console.error('Error retrieving post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getAllPosts', async (req, res) => {
  try {
    const posts = await db.any('SELECT * FROM posts LIMIT 10');

    const postsWithImages = posts.map(post => {
      const imageBase64 = post.image ? Buffer.from(post.image).toString('base64') : null;
      return {
        ...post,
        image: imageBase64
      };
    });

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/getUserPosts/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const posts = await db.any('SELECT * FROM posts WHERE user_id = $1', [userId]);

    const postsWithImages = posts.map(post => {
      const imageBase64 = post.image ? Buffer.from(post.image).toString('base64') : null;
      return {
        ...post,
        image: imageBase64
      };
    });

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error retrieving posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/updatePost/:id', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.buffer : null;
  const postId = req.params.id;

  try {
    if (image) {
      await db.none(
        'UPDATE posts SET title = $1, description = $2, image = $3 WHERE id = $4',
        [title, description, image, postId]
      );
    } else {
      await db.none(
        'UPDATE posts SET title = $1, description = $2 WHERE id = $3',
        [title, description, postId]
      );
    }
    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/sendMessage', async (req, res) => {
  const { senderId, receiverId, content } = req.body;

  try {
    await db.none(
      'INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)',
      [senderId, receiverId, content]
    );
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getMessages/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const messages = await db.any(
      'SELECT * FROM messages WHERE receiver_id = $1 ORDER BY timestamp DESC',
      [userId]
    );
    res.json(messages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/getArtist/:artistId', async (req, res) => {
  const artistId = req.params.artistId;

  try {
    const artist = await db.any('SELECT * FROM users WHERE id = $1', [artistId]);
    if (artist) {
      res.json(artist);
    } else {
      res.status(404).send('Artist not found');
    }
  } catch (error) {
    console.error('Error fetching artist:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



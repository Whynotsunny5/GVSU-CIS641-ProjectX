-- Posts table
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    FOREIGN KEY (user_id) REFERENCES users (id),
    image BYTEA,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Likes table
CREATE TABLE likes (
    post_id INT,
    user_id INT,
    like_type BOOLEAN, -- true for like, false for dislike
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

-- Comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    post_id INT,
    user_id INT,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts (id)
);

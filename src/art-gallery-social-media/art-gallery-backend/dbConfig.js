const pgp = require('pg-promise')();

const dbUrl = 'postgres://art_gallery_xnx9_user:eWcIdI2VrNXOlYIYIf8VreaSQU2DmFjE@dpg-clc48dmg1b2c73erivjg-a.oregon-postgres.render.com/art_gallery_xnx9';

const sslOptions = {
  rejectUnauthorized: true, // You can adjust this based on your security requirements
};

const db = pgp({
  connectionString: dbUrl,
  ssl: sslOptions,
});

module.exports = db;

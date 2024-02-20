// controllers/bookController.js
const { Database } = require('sqlite3').verbose();
const { open } = require('sqlite');

async function getAllBooks(req, res) {
  try {
    const db = await open({
      filename: './library.db',
      driver: Database,
    });
    const books = await db.all('SELECT * FROM books');
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { getAllBooks };

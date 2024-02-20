// controllers
const { Database } = require('sqlite3').verbose();
const { open } = require('sqlite');

async function getAllMembers(req, res) {
  try {
    const db = await open({
      filename: './library.db',
      driver: Database,
    });
    const members = await db.all('SELECT * FROM members');
    res.json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getMemberBooks(req, res) {
  const memberCode = req.params.code;
  try {
    const db = await open({
      filename: './library.db',
      driver: Database,
    });
    const books = await db.all(
      'SELECT * FROM borrowed_books JOIN books ON borrowed_books.book_code = books.code WHERE member_code = ?',
      [memberCode]
    );
    res.json(books);
  } catch (error) {
    console.error('Error fetching member books:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { getAllMembers, getMemberBooks };

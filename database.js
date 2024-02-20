const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function initDatabase() {
  try {
    const db = await open({
      filename: './library.db',
      driver: sqlite3.Database,
    });
    await db.exec(`
      CREATE TABLE IF NOT EXISTS members (
        code TEXT PRIMARY KEY,
        name TEXT
      );

      CREATE TABLE IF NOT EXISTS books (
        code TEXT PRIMARY KEY,
        title TEXT,
        author TEXT,
        stock INTEGER
      );

      CREATE TABLE IF NOT EXISTS borrowed_books (
        id INTEGER PRIMARY KEY,
        member_code TEXT,
        book_code TEXT,
        borrowed_date TEXT,
        return_date TEXT,
        FOREIGN KEY (member_code) REFERENCES members(code),
        FOREIGN KEY (book_code) REFERENCES books(code)
      );
    `);
    console.log('Database initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

module.exports = { initDatabase };

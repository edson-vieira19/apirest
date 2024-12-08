const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../arquivos/books.json');

exports.loadBooks = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    if (!data.trim()) {
      return [];
    }
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      return [];
    }
  }
};

exports.saveBooks = async (books) => {
    try {
      await fs.writeFile(USERS_FILE, JSON.stringify(books, null, 2));
    } catch (err) {
      throw err;
    }
  };
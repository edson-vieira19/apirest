const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../arquivos/authors.json');

exports.loadAuthors = async () => {
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

exports.saveAuthors = async (authors) => {
    try {
      await fs.writeFile(USERS_FILE, JSON.stringify(authors, null, 2));
    } catch (err) {
      throw err;
    }
  };
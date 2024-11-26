const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.resolve('../arquivos/users.json');

exports.loadUsers = async () => {
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

exports.saveUsers = async (users) => {
    try {
      await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    } catch (err) {
      throw err;
    }
  };
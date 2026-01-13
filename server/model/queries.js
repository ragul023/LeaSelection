const db = require("../config/db");

const register = async (name, email, mobilenumber, passwordHash) => {
  try {
    const [result] = await db.execute(
      `INSERT INTO users 
       (applicant_name, email, mobile_number, password_hash)
       VALUES (?, ?, ?, ?)`,
      [name, email, mobilenumber, passwordHash]
    );

    return {
      success: true,
      userId: result.insertId,
    };
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw error;
  }
};
const display = async () => {
  try {
    const [result] = await db.execute("SELECT * FROM users ");
    return {
      success: true,
      result: result,
    };
  } catch (error) {
    console.error("Fetching Failed", error.message);
    throw error;
  }
};

module.exports = { register, display };

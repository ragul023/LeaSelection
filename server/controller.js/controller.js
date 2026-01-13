// controllers/controller.js
const bcrypt = require("bcrypt");
const query = require("../model/queries");

const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, mobilenumber, password } = req.body;

    if (!name || !email || !mobilenumber || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const userId = await query.register(
      name,
      email,
      mobilenumber,
      passwordHash
    );

    res.status(201).json({
      id: userId.userId,
      message: "Registration Successful",
    });
  } catch (err) {
    res.status(400).json({
      message: "Error registering user",
      error: err.message,
    });
  }
};

const display = async (req, res) => {
  try {
    const result = await query.display();

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: "Error fetching user data",
      error: error.message,
    });
  }
};

module.exports = { register, display };

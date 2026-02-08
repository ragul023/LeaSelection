const parseJSON = require("../utils/jsonParser");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const data = await parseJSON(req);

    const { applicant_name, email, mobile_number, password } = data;

    if (!applicant_name || !email || !mobile_number || !password) {
      res.writeHead(400);
      return res.end(JSON.stringify({ message: "All fields required" }));
    }


    const password_hash = await bcrypt.hash(password, 10);

    User.create(
      {
        applicant_name,
        email,
        mobile_number,
        password_hash,
      },
      (err) => {
        if (err) {
          res.writeHead(500);
          return res.end(JSON.stringify({ message: "DB error" }));
        }

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "User registered successfully" }));
      }
    );
  } catch (err) {
    res.writeHead(400);
    res.end(JSON.stringify({ message: "Invalid JSON" }));
  }
};

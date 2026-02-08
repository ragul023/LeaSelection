const db = require("../config/db");

exports.create = (data, callback) => {
  const sql = `
    INSERT INTO users 
    (applicant_name, email, mobile_number, password_hash)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      data.applicant_name,
      data.email,
      data.mobile_number,
      data.password_hash
    ],
    callback
  );
};

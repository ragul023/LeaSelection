// server.js
const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const bcrypt = require('bcrypt');
const db = require('./db'); // your db module

const PORT = 3000;
const UPLOAD_DIR = path.join(__dirname, "uploads");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// CORS
function setCorsHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

// INSERT into DB using callback-style db.query
function insertRegistration(payload, cb) {
  const sql = `
    INSERT INTO registrations
    (name, email, phone, dob, website, marks, subscribe, address, apartment, city, state, pincode, caste, secret_key_hash, marksheet_path, review_level)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    payload.name ?? null,
    payload.email ?? null,
    payload.phone ?? null,
    payload.dob ?? null,
    payload.website ?? null,
    payload.mark ? Number(payload.mark) : null,
    payload.subscribe ? 1 : 0,
    payload.address ?? null,
    payload.apartment ?? null,
    payload.city ?? null,
    payload.state ?? null,
    payload.pincode ?? null,
    payload.caste ?? null,
    payload.secret_key_hash ?? null,
    payload.marksheet_path ?? null,
    payload.reviewLevel ? Number(payload.reviewLevel) : null,
  ];

  db.query(sql, values, (err, result) => {
    if (err) return cb(err);
    return cb(null, result.insertId);
  });
}

// SERVER
const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  // Preflight
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // GET /registrations (already working)
if (req.method === "GET" && req.url.startsWith("/registrations/")) {
  const parts = req.url.split("/").filter(Boolean); 
  const idStr = parts[1];

  const id = parseInt(idStr, 10);
  if (Number.isNaN(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({
      ok: false,
      error: "Invalid id"
    }));
  }

  const sql = "select name,email,phone,dob from registrations WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("DB select error:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({
        ok: false,
        error: "Database error"
      }));
    }

    if (!results || results.length === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({
        ok: false,
        message: "Registration not found"
      }));
    }

    // Convert RowDataPacket → plain JSON object
    const cleanData = JSON.parse(JSON.stringify(results[0]));

    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({
      ok: true,
      data: cleanData
    }));
  });

  return;
}


 //submit
  if (req.url === "/submit" && req.method === "POST") {
    const form = formidable({
      uploadDir: UPLOAD_DIR,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Formidable error:", err);
        res.writeHead(500, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ ok: false, error: "File upload error" }));
      }

      // REQUIRED FIELDS
      if (!fields.name || !fields.email) {
        res.writeHead(400, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ ok: false, error: "name & email required" }));
      }

      // HASH SECRET KEY
      let secretHash = null;
      if (fields.secretKey) {
        secretHash = await bcrypt.hash(fields.secretKey, 10);
      }

      // NORMALIZE SUBSCRIBE
      const subscribeVal =
        fields.subscribe === "1" ||
        fields.subscribe === "true" ||
        fields.subscribe === "on";

      // FILE PATH
      let marksheetPath = null;
      if (files.marksheet && files.marksheet.filepath) {
        marksheetPath = path.relative(process.cwd(), files.marksheet.filepath);
      }

      const payload = {
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        dob: fields.dob,
        website: fields.website,
        mark: fields.mark,
        subscribe: subscribeVal,
        address: fields.address,
        apartment: fields.apartment,
        city: fields.city,
        state: fields.state,
        pincode: fields.pincode,
        caste: fields.caste,
        reviewLevel: fields.reviewLevel,
        marksheet_path: marksheetPath,
        secret_key_hash: secretHash,
      };

      insertRegistration(payload, (err, insertId) => {
        if (err) {
          console.error("DB Insert error:", err);
          res.writeHead(500, { "Content-Type": "application/json" });
          return res.end(JSON.stringify({ ok: false, error: "Database error" }));
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        
        return res.end(JSON.stringify({ ok: true, id: insertId }));

      });
    });

    return;
  }

  // Other routes
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route not found" }));
});

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

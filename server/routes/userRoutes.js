const userController = require("../controllers/userController");

module.exports = (req, res) => {
  if (req.url === "/register" && req.method === "POST") {
    userController.register(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};

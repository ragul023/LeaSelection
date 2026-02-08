const http = require("http");
const userRoutes = require("./routes/userRoutes");

const server = http.createServer((req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");



  userRoutes(req, res);
});

server.listen(3000, () => {
  console.log("Backend running on port 3000");
});

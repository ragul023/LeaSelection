const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  cors()
);
app.use(express.urlencoded({ extended: true }));

const userRoutes = require("./routes/user.rout"); // adjust name if needed
app.use("/api", userRoutes);
app.post("/test", (req, res) => {
  console.log("TEST BODY:", req.body);
  res.json(req.body);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

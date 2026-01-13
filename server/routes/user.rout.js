// routes/rout.js
const express = require("express");
const router = express.Router();
const controller = require("../controller.js/controller");

router.post("/register", controller.register);
router.get("/display",controller.display);
router.get("/register", (req, res) => {
  res.send("Register route is working");
});


module.exports = router;

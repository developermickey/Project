const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/isLoggedIn");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/shop", isLoggedIn, (req, res) => {
  res.render("shop");
});
module.exports = router;

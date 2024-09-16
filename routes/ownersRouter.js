const express = require("express");
const router = express.Router();

const ownersModel = require("../models/Owner");

router.get("/create", async (req, res) => {
  let owners = await ownersModel.find();
  if (owners.length > 0) {
    return res.status(504).send("You don't have permission to create");
  } else {
    let { fullname, email, password } = req.body;
    let createdOwner = await ownersModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  }
});

router.get("/", (req, res) => {
  res.send("Owners Route");
});

module.exports = router;

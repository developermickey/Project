const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { email, password, fullname } = req.body;
    // Add user to database and send response
    let user = await userModel.findOne({ email: email });

    if (user) {
      return res.status(401).send("Email already exists");
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.send(err);
        } else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res.send("user created");
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email: email });
  if (!user) {
    return res.status(501).send("Invalid email or password");
  } else {
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(501).send("Invalid email or password");
      } else if (result) {
        let token = generateToken(user);
        res.cookie("token", token);
        res.send("Logged in successfully");
      } else {
        return res.status(501).send("Invalid email or password");
      }
    });
  }
};

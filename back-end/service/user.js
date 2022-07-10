const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (email, password) => {
  const hash = await bcrypt.hash(password, 10);

  return new User({
    email,
    password: hash,
  }).save();
};

exports.login = async (email, password) => {
  const validUser = await User.findOne({ email: email });

  const validPassword = await bcrypt.compare(password, validUser.password);

  return { validUser, validPassword };
};

exports.createJwt = (userId) => {
  return jwt.sign({ userId }, `${process.env.SECRET}`, {
    expiresIn: "24h",
  });
};

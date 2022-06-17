const jwt = require("jsonwebtoken");
const userService = require("../service/user");
require("dotenv").config();

exports.signup = (req, res) => {
  try {
    userService
      .signup(req.body.email, req.body.password)
      .then(() =>
        res.status(201).json({ message: "User successfully created !" })
      )
      .catch((error) => res.status(400).json({ error }));
  } catch {
    res.status(500).json({ error });
  }
};

exports.login = (req, res) => {
  try {
    userService
      .login(req.body.email, req.body.password)
      .then((user) => {
        if (!user.validUser) {
          return res.status(401).json({ error: "User not found !" });
        }

        if (!user.validPassword) {
          return res.status(401).json({ error: "Password incorrect !" });
        }

        res.status(200).json({
          userId: user.validUser._id,
          token: jwt.sign(
            { userId: user.validUser._id },
            `${process.env.SECRET}`,
            {
              expiresIn: "24h",
            }
          ),
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } catch {
    res.status(500).json({ error });
  }
};

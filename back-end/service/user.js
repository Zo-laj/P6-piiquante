const bcrypt = require("bcrypt");
const User = require("../models/User");

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

// exports.login = (email, password) => {
//     User.findOne({ email: req.body.email })
//     .then(user => {
//         if (!user) {
//             return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//         }
//         bcrypt.compare(req.body.password, user.password)
//         .then(valid => {
//             if (!valid) {
//                 return res.status(401).json({ error: 'Mot de passe incorrect !' });
//             }
//             res.status(200).json({
//                 userId: user._id,
//                 token: jwt.sign(
//                     { userId: user._id },
//                     `${process.env.SECRET}`,
//                     { expiresIn: '24h' })
//             });
//         })
//         .catch(error => res.status(500).json({ error }));
//     })
// };

const Sauce = require("../models/Sauce");
const likeService = require("../service/like");

exports.likeSauce = (req, res) => {
  try {
    likeService
      .likeSauce(req.params.id, req.body.userId, req.body.like)
      .then(() => {
        if (req.body.like === 1) {
          res.status(201).json({ message: "Likes +1" });
        }
        if (req.body.like === -1) {
          res.status(201).json({ message: "Dislikes +1" });
        }

        if (req.body.like === 0) {
          res.status(201).json({ message: "Like canceled" });
        }
      })
      .catch((error) => res.status(400).json({ error }));
  } catch {
    res.status(500).json({ error });
  }
};

// exports.likeSauce = (req, res) => {
//     Sauce.findOne({ _id: req.params.id })
//     .then(sauce => {
//         if(!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
//             Sauce.updateOne({ _id: req.params.id }, {
//                 $inc : {likes: 1},
//                 $push: {usersLiked: req.body.userId}
//             })
//             .then(() => res.status(201).json({message: 'Likes +1'}))
//             .catch(error => res.status(400).json({error}))
//         }

//         if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
//             Sauce.updateOne({ _id: req.params.id }, {
//                 $inc : {dislikes: 1},
//                 $push: {usersDisliked: req.body.userId}
//             })
//             .then(() => res.status(201).json({message: ' Dislikes +1'}))
//             .catch(error => res.status(400).json({error}))
//         }

//         if ( req.body.like === 0) {
//             if (sauce.usersLiked.includes(req.body.userId)) {
//                 Sauce.updateOne({ _id: req.params.id }, {
//                     $inc : {likes: -1},
//                     $pull: {usersLiked: req.body.userId}
//                 })
//                 .then(() => res.status(201).json({message: 'like annulé'}))
//                 .catch(error => res.status(400).json({error}))

//             } else if (sauce.usersDisliked.includes(req.body.userId)) {
//                 Sauce.updateOne({ _id: req.params.id }, {
//                     $inc : {dislikes: -1},
//                     $pull: {usersDisliked: req.body.userId}
//                 })
//                 .then(() => res.status(201).json({message: 'like annulé'}))
//                 .catch(error => res.status(400).json({error}))
//             }
//         }
//     })
//     .catch(error => res.status(404).json({error}));
// };

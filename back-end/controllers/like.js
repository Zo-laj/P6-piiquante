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

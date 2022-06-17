const Sauce = require("../models/Sauce");

exports.likeSauce = async (id, userId, like) => {
  const likedSauce = await Sauce.findOne({ _id: id });

  if (!likedSauce.usersLiked.includes(userId) && like === 1) {
    return Sauce.updateOne(
      { _id: id },
      {
        $inc: { likes: 1 },
        $push: { usersLiked: userId },
      }
    );
  }

  if (!likedSauce.usersDisliked.includes(userId) && like === -1) {
    return Sauce.updateOne(
      { _id: id },
      {
        $inc: { dislikes: 1 },
        $push: { usersDisliked: userId },
      }
    );
  }

  if (like === 0) {
    if (likedSauce.usersLiked.includes(userId)) {
      return Sauce.updateOne(
        { _id: id },
        {
          $inc: { likes: -1 },
          $pull: { usersLiked: userId },
        }
      );
    } else if (likedSauce.usersDisliked.includes(userId)) {
      Sauce.updateOne(
        { _id: id },
        {
          $inc: { dislikes: -1 },
          $pull: { usersDisliked: userId },
        }
      );
    }
  }
};

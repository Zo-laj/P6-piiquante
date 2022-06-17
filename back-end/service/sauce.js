const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauce = async (sauce, req) => {
  const sauceObject = await JSON.parse(sauce);
  delete sauceObject._id;

  return new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  }).save();
};

exports.getAllSauces = () => {
  return Sauce.find();
};

exports.getOneSauce = (id) => {
  return Sauce.findOne({ _id: id });
};

exports.updateSauce = (sauce, file, req, id) => {
  const sauceObject = file
    ? {
        ...JSON.parse(sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          file.filename
        }`,
      }
    : { ...req.body };
  return Sauce.updateOne({ _id: id }, { ...sauceObject, _id: id });
};

exports.deleteSauce = async (id) => {
  const deletedSauce = await Sauce.findOne({ _id: id });

  const filename = await deletedSauce.imageUrl.split("/images/")[1];

  fs.unlink(`images/${filename}`, () => {
    Sauce.deleteOne({ _id: id });
  });

  return Sauce.deleteOne({ _id: id });
};

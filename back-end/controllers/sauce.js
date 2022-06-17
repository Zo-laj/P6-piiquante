const service = require("../service/sauce");

exports.createSauce = (req, res) => {
  try {
    service
      .createSauce(req.body.sauce, req)
      .then(() =>
        res.status(201).json({ message: "Sauce successfully created" })
      )
      .catch((error) => res.status(400).json({ error }));
  } catch {
    res.status(500).json({ error });
  }
};

exports.getAllSauces = (req, res) => {
  try {
    service
      .getAllSauces()
      .then((sauces) => res.status(200).json(sauces))
      .catch((error) => res.status(400).json({ error }));
  } catch {
    res.status(500).json({ error });
  }
};

exports.getOneSauce = (req, res) => {
  try {
    service
      .getOneSauce(req.params.id)
      .then((sauce) => res.status(200).json(sauce))
      .catch((error) => res.status(404).json({ error }));
  } catch {
    res.status(500).json({ error });
  }
};

exports.updateSauce = (req, res) => {
  try {
    service
      .updateSauce(req.body.sauce, req.file, req, req.params.id)
      .then(() => res.status(200).json({ message: "Object updated !" }))
      .catch((error) => res.status(400).json({ error }));
  } catch {
    res.status(500).json({ error });
  }
};

exports.deleteSauce = (req, res) => {
  try {
    service
      .deleteSauce(req.params.id)
      .then(() => res.status(200).json({ message: "Object deleted!" }))
      .catch((error) => res.status(400).json({ error }));
  } catch {
    res.status(500).json({ error });
  }
};

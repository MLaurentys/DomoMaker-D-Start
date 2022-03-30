const { Pikachu } = require('../models');

const getPikachus = (req, res) => Pikachu.findByOwner(req.session.account._id, (err, docs) => {
  if (err) return res.status(400).json({ error: 'An error has occurred!' });

  return res.json({ pikachus: docs });
});

const makePikachu = async (req, res) => {
  if (!req.body.name || !req.body.level) {
    return res.status(400).json({ error: 'Both name and level are required!' });
  }
  const pikachuData = {
    name: req.body.name,
    level: req.body.level,
    owner: req.session.account._id,
  };
  try {
    const newPikachu = new Pikachu(pikachuData);
    await newPikachu.save();
    return res
      .status(201)
      .json({ name: newPikachu.name, level: newPikachu.level });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Pikachu already exists!' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

module.exports = {
  makePikachu,
  getPikachus,
};

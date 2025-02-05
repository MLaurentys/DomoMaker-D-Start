const { Domo } = require('../models');

const makerPage = (req, res) => res.render('app');

const getDomos = (req, res) => Domo.findByOwner(req.session.account._id, (err, docs) => {
  if (err) return res.status(400).json({ error: 'An error has occurred!' });

  return res.json({ domos: docs });
});

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required!' });
  }
  const domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };
  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res.status(201).json({ name: newDomo.name, age: newDomo.age });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists!' });
    }
    return res.status(400).json({ error: 'An error occured' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
};

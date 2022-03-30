const mongoose = require('mongoose');
const _ = require('underscore');

let PikachuModel = {};
const setName = (name) => _.escape(name).trim();
const PikachuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  level: {
    type: Number,
    min: 1,
    require: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

PikachuSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  level: doc.level,
});
PikachuSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    // Convert the string ownerId to an object id
    owner: mongoose.Types.ObjectId(ownerId),
  };
  return PikachuModel.find(search).select('name level').lean().exec(callback);
};
PikachuModel = mongoose.model('Pikachu', PikachuSchema);
module.exports = PikachuModel;

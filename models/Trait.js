const mongoose = require("mongoose");

const TraitSchema = new mongoose.Schema({
  abilityName: {
    type: String,
    required: true,
  },
  abilityDescription: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  doesDamage: {
    type: Boolean,
    required: true,
  },
  damageType: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Trait", TraitSchema);

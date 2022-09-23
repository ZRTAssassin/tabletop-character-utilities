const mongoose = require("mongoose");

const TraitSchema = new mongoose.Schema({
  abilityName: { type: String, required: true },
  abilityDescription: { type: String, required: true },
  buffSelf: { type: Boolean, required: true },
  buffAllies: { type: Boolean, required: true },
  buffRange: { type: String, required: true },
  damageType: { type: String, required: true },
  damageSingle: { type: Boolean, required: true },
  damageArea: { type: Boolean, required: true },
  damageRange: { type: String, required: true },
  damageAreaType: { type: String, required: true },
  debuffSingle: { type: Boolean, required: true },
  debuffArea: { type: Boolean, required: true },
  debuffRange: { type: String, required: true },
  debuffAreaType: { type: String, required: true },
  healSelf: { type: Boolean, required: true },
  healTarget: { type: Boolean, required: true },
  healRange: { type: String, required: true },
  healAreaType: { type: String, required: true },
  sourceCreature: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  useTime: { type: String, required: true },
});

module.exports = mongoose.model("Trait", TraitSchema);

const mongoose = require("mongoose");

const TraitSchema = new mongoose.Schema({
  buffSelf: { type: Boolean, required: true },
  buffAllies: { type: Boolean, required: true },
  buffRange: { type: String, required: true },
  damageType: { type: String, required: true }, // done
  damageSingle: { type: Boolean, required: true }, // done
  damageArea: { type: Boolean, required: true }, // done
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
  sourceCreature: { type: String, required: true }, // done
  traitName: { type: String, required: true }, // done
  traitDescription: { type: String, required: true }, //done
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  useTime: { type: String, required: true },
});

module.exports = mongoose.model("Trait", TraitSchema);

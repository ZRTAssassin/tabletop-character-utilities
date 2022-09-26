const mongoose = require("mongoose");

const TraitSchema = new mongoose.Schema({
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
  recharge: { type: Boolean, required: true },
  rechargeTime: { type: String, required: true },
  sourceBook: { type: String, required: true }, // done
  sourceCreature: { type: String, required: true }, // done
  traitDescription: { type: String, required: true }, //done
  traitName: { type: String, required: true }, // done
  traitType: { type: String, required: true }, // done
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  useTime: { type: String, required: true },
  useActionTime: { type: String, required: true },
});

module.exports = mongoose.model("Trait", TraitSchema);

// activation
// activationType
// activationCondition
// targetValue
// targetUnits
// targetType
// rangeNormal
// rangeMax
// rangeUnits
// durationValue
// durationUnits
// limitedUsesValue
// limitedUsesMax
// limitedUsesPer
// consumeType
// consumeTarget
// consumeAmount
// actionRecharge // not needed. Disabled on the form
// actionRechargeValue
// actionRechargeIsCharged
//
//
//

const mongoose = require("mongoose");

const TraitSchema = new mongoose.Schema({
  traitName: { type: String, required: true },
  traitType: { type: String, required: true },
  sourceCreature: { type: String, required: false },
  sourceBook: { type: String, required: false },
  traitDescription: { type: String, required: false },
  activation: { type: Number, required: false },
  activationType: { type: String, required: false },
  activationCondition: { type: String, required: false },
  targetValue: { type: Number, required: false },
  targetUnits: { type: String, required: false },
  targetType: { type: String, required: false },
  rangeNormal: { type: Number, required: false },
  rangeMax: { type: Number, required: false },
  rangeUnits: { type: String, required: false },
  durationValue: { type: Number, required: false },
  durationUnits: { type: String, required: false },
  limitedUsesValue: { type: Number, required: false },
  limitedUsesMax: { type: Number, required: false },
  limitedUsesPer: { type: String, required: false },
  consumeType: { type: String, required: false },
  consumeAmount: { type: Number, required: false },
  actionRechargeValue: { type: String, required: false },
  actionRechargeIsCharged: { type: Boolean, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Trait", TraitSchema);

// activation - done
// activationType - done
// activationCondition - done
// targetValue - done
// targetUnits - done
// targetType - done
// rangeNormal - done
// rangeMax - done
// rangeUnits - done
// durationValue - done
// durationUnits - done
// limitedUsesValue - done
// limitedUsesMax - done
// limitedUsesPer - done
// consumeType - done
// consumeTarget - done
// consumeAmount - done
// actionRecharge // not needed. Disabled on the form
// actionRechargeValue - done
// actionRechargeIsCharged - done
//
//
//

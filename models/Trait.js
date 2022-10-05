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
  actionRechargeIsCharged: { type: Boolean, default: false, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Trait", TraitSchema);

/*
actionTypeLabel
actionType
abilityModifierLabel
abilityModifier
damageTypeLabel
damageType
versatileDamageLabel
versatileDamage
saveLabel
saveAbility
saveDC
saveScaling
*/

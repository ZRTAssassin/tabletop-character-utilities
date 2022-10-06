const mongoose = require("mongoose");

const TraitSchema = new mongoose.Schema({
  traitName: { type: String, default: "", required: true },
  traitType: { type: String, default: "", required: true },
  sourceCreature: { type: String, default: "", required: false },
  sourceBook: { type: String, default: "", required: false },
  traitDescription: { type: String, default: "", required: false },
  activation: { type: Number, default: 0, required: false },
  activationType: { type: String, default: "", required: false },
  activationCondition: { type: String, default: "", required: false },
  targetValue: { type: Number, default: 0, required: false },
  targetUnits: { type: String, default: "", required: false },
  targetType: { type: String, default: "", required: false },
  rangeNormal: { type: Number, default: 0, required: false },
  rangeMax: { type: Number, default: 0, required: false },
  rangeUnits: { type: String, default: "", required: false },
  durationValue: { type: Number, default: 0, required: false },
  durationUnits: { type: String, default: "", required: false },
  limitedUsesValue: { type: Number, default: 0, required: false },
  limitedUsesMax: { type: Number, default: 0, required: false },
  limitedUsesPer: { type: String, default: "", required: false },
  consumeType: { type: String, default: "", required: false },
  consumeAmount: { type: Number, default: 0, required: false },
  actionRechargeValue: { type: String, default: "", required: false },
  actionRechargeIsCharged: { type: Boolean, default: false, required: false },
  actionType: { type: String, default: "", required: false },
  abilityModifer: { type: String, default: "", required: false },
  damageTypeFormula: { type: String, default: "", required: false },
  damageType: { type: String, default: "", required: false },
  versatileDamage: { type: String, default: "", required: false },
  saveAbility: { type: String, default: "", required: false },
  saveDC: { type: Number, default: 0, required: false },
  saveScaling: { type: String, default: "", required: false },
  tagDamage: { type: Boolean, default: false, required: false },
  tagBuff: { type: Boolean, default: false, required: false },
  tagDebuff: { type: Boolean, default: false, required: false },
  tagMovement: { type: Boolean, default: false, required: false },
  tagConditions: { type: Boolean, default: false, required: false },
  tagUtility: { type: Boolean, default: false, required: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Trait", TraitSchema);

/*
actionTypeLabel
actionType - done
abilityModifierLabel
abilityModifier done
damageTypeFormula done
damageType done
saveLabel
saveAbility done
saveDC done
saveScaling done
tagDamage done
tagBuff done
tagDebuff done
tagMovement done
tagCondition done
tagUtility done
*/

const Trait = require("../models/Trait");

module.exports = {
  // render list of traits
  // @route GET /traits/
  getTraits: async (req, res) => {
    try {
      const traitItems = await Trait.find({ user: req.user.id })
        .collation({ locale: "en" })
        .sort({ traitName: 1 });
      res.render("traits.ejs", {
        traits: traitItems,
        user: req.user,
        isLoggedIn: req.isAuthenticated(),
      });
    } catch (err) {
      console.error(err);
    }
  },
  getAddTrait: async (req, res) => {
    res.render("addTrait.ejs", {
      user: req.user,
      isLoggedIn: req.isAuthenticated(),
    });
  },
  // add a new trait
  // @route /traits/addTrait
  addTrait: async (req, res) => {
    if (typeof req.body.tagBuff === "object") {
      req.body.tagBuff = true;
    }
    if (typeof req.body.tagConditions === "object") {
      req.body.tagConditions = true;
    }
    if (typeof req.body.tagDamage === "object") {
      req.body.tagDamage = true;
    }
    if (typeof req.body.tagDebuff === "object") {
      req.body.tagDebuff = true;
    }
    if (typeof req.body.tagMovement === "object") {
      req.body.tagMovement = true;
    }
    if (typeof req.body.tagUtility === "object") {
      req.body.tagUtility = true;
    }
    if (typeof req.body.actionRechargeIsCharged === "object") {
      req.body.actionRechargeIsCharged = true;
    }
    console.log(req.body);
    try {
      await Trait.create({
        traitName: req.body.traitName,
        traitType: req.body.traitType,
        sourceCreature: req.body.sourceCreature,
        sourceBook: req.body.sourceBook,
        traitDescription: req.body.traitDescription,
        activation: req.body.activation,
        activationType: req.body.activationType,
        activationCondition: req.body.activationCondition,
        targetValue: req.body.targetValue,
        targetUnits: req.body.targetUnits,
        targetType: req.body.targetType,
        rangeNormal: req.body.rangeNormal,
        rangeMax: req.body.rangeMax,
        rangeUnits: req.body.rangeUnits,
        durationValue: req.body.durationValue,
        durationUnits: req.body.durationUnits,
        limitedUsesValue: req.body.limitedUsesValue,
        limitedUsesMax: req.body.limitedUsesMax,
        consumeType: req.body.consumeType,
        consumeAmount: req.body.consumeAmount,
        actionRechargeValue: req.body.actionRechargeValue,
        actionRechargeIsCharged: req.body.actionRechargeIsCharged,
        actionType: req.body.actionType,
        abilityModifer: req.body.abilityModifer,
        damageTypeFormula: req.body.damageTypeFormula,
        damageType: req.body.damageType,
        versatileDamage: req.body.versatileDamage,
        saveAbility: req.body.saveAbility,
        saveDC: req.body.saveDC,
        saveScaling: req.body.saveScaling,
        tagDamage: req.body.tagDamage,
        tagBuff: req.body.tagBuff,
        tagDebuff: req.body.tagDebuff,
        tagMovement: req.body.tagMovement,
        tagConditions: req.body.tagConditions,
        tagUtility: req.body.tagUtility,
        user: req.user.id,
      });
      console.log(`${req.body.traitName} added!`);
      res.redirect("/traits");
    } catch (err) {
      console.log(err);
      let message = err._message.split(" ");
      if (message[1] === "validation" && message[2] === "failed") {
        res.redirect("/traits");
      }
    }
  },
  //
  // @route /traits/deleteTrait/:id
  deleteTrait: async (req, res) => {
    console.log("request: ", req.params.id);
    try {
      await Trait.remove({ _id: req.params.id });
      console.log(`deleted trait ${req.params.id}!`);
      res.redirect("/traits");
    } catch (err) {
      console.log(err);
    }
  },
  //
  // @route GET /traits/edit/:id
  editTrait: async (req, res) => {
    // console.log(request.params.id);
    try {
      const trait = await Trait.findById(req.params.id);
      res.render("traits/edit", {
        trait: trait,
        user: req.user,
        isLoggedIn: req.isAuthenticated(),
      });
      // response.json("Successful!");
    } catch (err) {
      console.log(err);
    }
  },
  // @description Update trait
  // @route PUT /trait/:id
  requestEditTrait: async (req, res) => {
    console.log(`RequestEditTrait called. ID: ${req.params.id}`);
    console.log(req.body);
    let trait = await Trait.findById(req.params.id);

    if (!trait) {
      return res.redirect("../error/404");
    }
    // console.log(req.body);
    trait = await Trait.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: false,
      runValidators: true,
    });

    res.redirect("/traits");
  },
  addTestTrait: async (req, res) => {
    console.log("Random trait requested!");
    let date = new Date();
    let time = date.toLocaleTimeString();
    let description = "";

    let chars = "ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
    for (let index = 0; index < 50; index++) {
      description += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const fakeSource = "PHB (100)";

    try {
      await Trait.create({
        abilityName: time,
        abilityDescription: description,
        source: fakeSource,
        doesDamage: true || false,
        damageType: "None",
      });
      console.log(`${time} added!`);
      res.redirect("/traits");
    } catch (err) {
      console.log(err);
    }
  },
};

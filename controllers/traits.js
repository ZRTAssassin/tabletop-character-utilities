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
  // new the page to add traits
  // @route /traits/addTrait
  getAddTrait: async (req, res) => {
    res.render("addTrait.ejs", {
      user: req.user,
      isLoggedIn: req.isAuthenticated(),
    });
  },
  // get buffs
  // @route /traits/category/buff
  getBuffTraits: async (req, res) => {
    try {
      const traitItems = await Trait.find({
        user: req.user.id,
        buff: true,
      })
        .collation({ locale: "en" })
        .sort({ traitName: 1 });
      res.render("traits/traitCategory.ejs", {
        traits: traitItems,
        user: req.user,
        isLoggedIn: req.isAuthenticated(),
      });
    } catch (err) {
      console.error(err);
    }
  },
  // get conditions
  // @route /traits/category/conditions
  getConditionTraits: async (req, res) => {
    try {
      const traitItems = await Trait.find({
        user: req.user.id,
        conditions: true,
      })
        .collation({ locale: "en" })
        .sort({ traitName: 1 });
      res.render("traits/traitCategory.ejs", {
        traits: traitItems,
        user: req.user,
        isLoggedIn: req.isAuthenticated(),
      });
    } catch (err) {
      console.error(err);
    }
  },
  // get damage
  // @route /traits/category/damage
  getDamageTraits: async (req, res) => {
    try {
      const traitItems = await Trait.find({
        user: req.user.id,
        damage: true,
      })
        .collation({ locale: "en" })
        .sort({ traitName: 1 });
      res.render("traits/traitCategory.ejs", {
        traits: traitItems,
        user: req.user,
        isLoggedIn: req.isAuthenticated(),
      });
    } catch (err) {
      console.error(err);
    }
  },
  // get debuff
  // @route /traits/category/debuff
  getDebuffTraits: async (req, res) => {
    try {
      const traitItems = await Trait.find({
        user: req.user.id,
        debuff: true,
      })
        .collation({ locale: "en" })
        .sort({ traitName: 1 });
      res.render("traits/traitCategory.ejs", {
        traits: traitItems,
        user: req.user,
        isLoggedIn: req.isAuthenticated(),
      });
    } catch (err) {
      console.error(err);
    }
  },
  // get movement
  // @route /traits/category/movement
  getMovementTraits: async (req, res) => {
    try {
      const traitItems = await Trait.find({
        user: req.user.id,
        movement: true,
      })
        .collation({ locale: "en" })
        .sort({ traitName: 1 });
      res.render("traits/traitCategory.ejs", {
        traits: traitItems,
        user: req.user,
        isLoggedIn: req.isAuthenticated(),
      });
    } catch (err) {
      console.error(err);
    }
  },
  // get utility
  // @route /traits/category/utility
  getUtilityTraits: async (req, res) => {
    try {
      const traitItems = await Trait.find({
        user: req.user.id,
        utility: true,
      })
        .collation({ locale: "en" })
        .sort({ traitName: 1 });
      res.render("traits/traitCategory.ejs", {
        traits: traitItems,
        user: req.user,
        isLoggedIn: req.isAuthenticated(),
      });
    } catch (err) {
      console.error(err);
    }
  },
  // add a new trait
  // @route /traits/addTrait
  addTrait: async (req, res) => {
    if (typeof req.body.buff === "object") {
      req.body.buff = true;
    }
    if (typeof req.body.conditions === "object") {
      req.body.conditions = true;
    }
    if (typeof req.body.damage === "object") {
      req.body.damage = true;
    }
    if (typeof req.body.debuff === "object") {
      req.body.debuff = true;
    }
    if (typeof req.body.movement === "object") {
      req.body.movement = true;
    }
    if (typeof req.body.utility === "object") {
      req.body.utility = true;
    }
    if (typeof req.body.actionRechargeIsCharged === "object") {
      req.body.actionRechargeIsCharged = true;
    }
    console.log(req.body.conditions, typeof req.body.conditions);
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
        buff: req.body.buff,
        conditions: req.body.conditions,
        damage: req.body.damage,
        debuff: req.body.debuff,
        movement: req.body.movement,
        utility: req.body.utility,
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
    if (typeof req.body.buff === "object") {
      req.body.buff = true;
    }
    if (typeof req.body.conditions === "object") {
      req.body.conditions = true;
    }
    if (typeof req.body.damage === "object") {
      req.body.damage = true;
    }
    if (typeof req.body.debuff === "object") {
      req.body.debuff = true;
    }
    if (typeof req.body.movement === "object") {
      req.body.movement = true;
    }
    if (typeof req.body.utility === "object") {
      req.body.utility = true;
    }
    if (typeof req.body.actionRechargeIsCharged === "object") {
      req.body.actionRechargeIsCharged = true;
    }
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

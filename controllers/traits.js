const Trait = require("../models/Trait");

module.exports = {
  // render list of traits
  // @route GET /traits/
  getTraits: async (req, res) => {
    try {
      const traitItems = await Trait.find({ user: req.user.id });
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
    // console.log(req.body);
    try {
      await Trait.create({
        traitName: req.body.traitName,
        traitType: req.body.traitType,
        sourceCreature: req.body.sourceCreature,
        sourceBook: req.body.sourceBook,
        traitDescription: req.body.traitDescription,
        activation: request.body.activation,
        activationType: request.body.activationType,
        activationCondition: request.body.activationCondition,
        targetValue: request.body.targetValue,
        targetUnits: request.body.targetUnits,
        targetType: request.body.targetType,
        rangeNormal: request.body.rangeNormal,
        rangeMax: request.body.rangeMax,
        rangeUnits: request.body.rangeUnits,
        durationValue: request.body.durationValue,
        durationUnits: request.body.durationUnits,
        limitedUsesValue: request.body.limitedUsesValue,
        limitedUsesMax: request.body.limitedUsesMax,
        consumeType: request.body.consumeType,
        consumeAmount: request.body.consumeAmount,
        actionRechargeValue: request.body.actionRechargeValue,
        actionRechargeIsCharged: request.body.actionRechargeIsCharged,
        user: req.user.id,
      });
      console.log(`${req.body.traitName} added!`);
      res.redirect("/traits");
    } catch (err) {
      // console.log(err);
      let message = err._message.toLowerCase().split(" ");
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
      res.render("traits/edit", { trait: trait, user: req.user });
      // response.json("Successful!");
    } catch (err) {
      console.log(err);
    }
  },
  // @description Update trait
  // @route PUT /trait/:id
  requestEditTrait: async (req, res) => {
    console.log(`RequestEditTrait called. ID: ${req.params.id}`);
    let trait = await Trait.findById(req.params.id);

    if (!trait) {
      return res.render("/error/404");
    }
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

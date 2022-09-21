const Trait = require("../models/Trait");

module.exports = {
  // render list of traits
  // @route GET /traits/
  getTraits: async (request, response) => {
    try {
      const traitItems = await Trait.find();
      response.render("traits.ejs", { traits: traitItems });
    } catch (err) {
      console.error(err);
    }
  },
  //
  // @route /traits/addTrait
  addTrait: async (request, response) => {
    try {
      await Trait.create({
        abilityName: request.body.abilityName,
        abilityDescription: request.body.abilityDescription,
        source: request.body.source,
        doesDamage: request.body.doesDamage || false,
        damageType: request.body.damageType,
      });
      console.log(`${request.body.abilityName} added!`);
      response.redirect("/traits");
    } catch (err) {
      console.log(err);
    }
  },
  //
  // @route /traits/deleteTrait/:id
  deleteTrait: async (request, response) => {
    console.log("request: ", request.params.id);
    try {
      await Trait.remove({ _id: request.params.id });
      console.log(`deleted trait ${request.params.id}!`);
      response.redirect("/traits");
    } catch (err) {
      console.log(err);
    }
  },
  //
  // @route GET /traits/edit/:id
  editTrait: async (request, response) => {
    // console.log(request.params.id);
    try {
      const trait = await Trait.findById(request.params.id);
      response.render("traits/edit", { trait: trait, user: request.user });
      // response.json("Successful!");
    } catch (err) {
      console.log(err);
    }
  },
  // @description Update trait
  // @route PUT /trait/:id
  requestEditTrait: async (request, response) => {
    console.log(`RequestEditTrait called. ID: ${request.params.id}`);
    let trait = await Trait.findById(request.params.id);

    if (!trait) {
      return response.render("/error/404");
    }
    trait = await Trait.findOneAndUpdate(
      { _id: request.params.id },
      request.body,
      {
        new: false,
        runValidators: true,
      }
    );

    response.redirect("/traits");
  },
  addTestTrait: async (request, response) => {
    console.log("Random trait requested!");
    let date = new Date();
    let time = date.toLocaleTimeString();
    let description = "";

    let chars = "ABCDEFGHIJLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
    for (let index = 0; index < 10; index++) {
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
      response.redirect("/traits");
    } catch (err) {
      console.log(err);
    }
  },
};

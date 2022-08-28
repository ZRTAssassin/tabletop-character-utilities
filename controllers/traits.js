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
  // @route /traits/deleteTrait
  deleteTrait: async (request, response) => {
    console.log(request.body.idFromJS);
    try {
      await Trait.findOneAndDelete({ _id: request.body.idFromJS });
      console.log(`deleted trait ${request.body.idFromJS}!`);
      response.json("deleted it!");
    } catch (error) {
      console.log(error);
    }
  },
  //
  // @route GET /traits/edit/:id
  editTrait: async (request, response) => {
    // console.log(request.params.id);
    try {
      const trait = await Trait.findById(request.params.id);
      response.render("traits/edit", { trait: trait });
      // response.json("Successful!");
    } catch (error) {
      console.log(error);
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
};

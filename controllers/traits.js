const { response } = require("express");
const Trait = require("../models/Trait");

module.exports = {
  getTraits: async (request, response) => {
    try {
      const traitItems = await Trait.find();
      response.render("traits.ejs", { traits: traitItems });
    } catch (err) {
      console.error(err);
    }
  },
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
  editTrait: async (request, response) => {
    console.log(request.params.id);
    try {
      const trait = await Trait.findById(request.params.id);
      response.render("edit", { trait: trait });
      // response.json("Successful!");
    } catch (error) {
      console.log(error);
    }
  },
};

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
};

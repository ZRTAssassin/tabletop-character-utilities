const Trait = require("../models/Trait");

module.exports = {
  getTraits: async (request, response) => {
    try {
      const traitItems = await Trait.find();
      response.render("traits.ejs", { traits: traitItems });
    } catch (err) {
      console.error(err);
    }
  }
};

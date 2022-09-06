const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  artificer: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Class", ClassSchema);

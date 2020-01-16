/*placeholder stretch goal (changing profile order) that 
I may do anyways bc cool feature and need more backend stuff to do */

const mongoose = require("mongoose");

const ProfOrderSchema = new mongoose.Schema({
  creator: String,
  order: [{
      plant_id: String,
      index: Number,
  }] //apparently this will also assign an id to each pair, lit
});

// compile model from schema
module.exports = mongoose.model("profileOrder", ProfOrderSchema);
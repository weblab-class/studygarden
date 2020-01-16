const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const PlantSchema = new mongoose.Schema({
  plantName: String,
  subject: String,
  creator_id: String, //will hold the user's objectId
  timeCreated: {Date, default: Date.now},
  goalTime: Date,
  studyTimeIniti: {Date, default: null},
  studyTimeFinal: {Date, default: null},
  studyTimeCumul: {Number, default: 0},
  Stage: {Number, default: 0},
  isStudying: {Boolean, default: false},
  homePageIndex: {Number, default: null}, /* in case we want to
  let people reorder their plants (doesn't seem too hard to implement)*/
  // famous last words


});

// compile model from schema
module.exports = mongoose.model("plant", PlantSchema);

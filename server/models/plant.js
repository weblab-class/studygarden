const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const PlantSchema = new mongoose.Schema({
  plantName: String,
  plantType: Number, //can be string if y'all want it to be
  subject: String,
  creator_id: String, //will hold the user's objectId
  timeCreated: Date,
  goalTime: Number,
  studyTimeCumul: Number,
  stage: Number,
  isStudying: Boolean,
  // homePageIndex: Number,
  // /* in case we want to let people reorder their plants
  // (doesn't seem too hard to implement)*/
  // // famous last words
  //  actually is redundant, oops
  pomodoroCount: { type: Number, default: 0 },
});

// compile model from schema
module.exports = mongoose.model('plant', PlantSchema);

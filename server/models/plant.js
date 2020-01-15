const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const PlantSchema = new mongoose.Schema({
  plantName: String,
  subject: String,
  creator: {type: ObjectId, ref: "user"},
  timeCreated: {Date, default: Date.now},
  goalTime: Date,
  studyTimeIniti: Date,
  studyTimeFinal: Date,
  studyTimeCumul: Number,
  Stage: Number,
  isStudying: Boolean,


});

// compile model from schema
module.exports = mongoose.model("plant", PlantSchema);

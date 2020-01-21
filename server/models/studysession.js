//this will be used for tracking the time the study session started.
//hopefully will used for finding elapsed time for study count down
const mongoose = require("mongoose");

const StudySessionSchema = new mongoose.Schema({
  creator_id: String,
  plantId: String,
  elapsedTime: { type: Number, default: 0 },
  timeStarted: { type: Date, default: Date.now },
  studySessionLength: Number,
  initCumulativeTime: Number
});

// compile model from schema
module.exports = mongoose.model("studySession", StudySessionSchema);

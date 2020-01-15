//this will be used for tracking the time the study session started.
//hopefully will used for finding elapsed time for study count down
const mongoose = require("mongoose");

const StudySessionSchema = new mongoose.Schema({
  googleid: String,
  //TODO set up plant id | plant id: String,
  time: Date
});

// compile model from schema
module.exports = mongoose.model("studySession", StudySessionSchema);

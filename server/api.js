/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

/**
 * @team doc in drive will eventually contain endpoint documentation
 */
const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const StudySession = require("./models/studysession");
const Plant = require("./models/plant"); //planty bois are coming 👀
const ProfOrder = require("./models/profileorder");
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
//const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

/* router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});
*/

//will need sockets don't delete plz :x

router.post("/session/update", async (req, res) => {
  //WIP
  //at the beginning of session, create a brand new session, set "isStudying" to true through this
  //at the end, set "isStudying" to false through /plant/update
  //if starting a new study session, send in creatorId, plantId, studySessionLength
  //if reporting time, send in plantId and elapsedTime
  const plant = req.body.plantId;
  const plantData = await Plant.findById(plant);
  //res.send(plantData);
  let session;
  if (plantData.isStudying === false) {
    StudySession.findOne({ plantId: plant }, async (err, doc) => {
      if (err) {
        return res.status(500).send(err);
      } else if (doc) {
        await doc.delete();
      }
      session = new StudySession({
        creator_id: req.body.creatorId,
        plantId: req.body.plantId,
        studySessionLength: req.body.studySessionLength,
        initCumulativeTime: plantData.studyTimeCumul,
      });
      console.log("session", session);
      plantData.isStudying = true;
      plantData.save();
      return session.save();
    });
  } else {
    session = await StudySession.findOne({ plantId: plant });
    if (req.body.elapsedTime) {
      session.elapsedTime = req.body.elapsedTime;
    }
    // if (session.&&(req.body.elapsedTime === session.studySessionLength || session.elapsedTime === session.studySessionLength)) {
    //   //for debugging
    //   res.send("session finished");
    // }
    const sesStatus = await session.save();
    res.send(sesStatus);
  }
});

router.get("/session/", (req, res) => {
  try {
    StudySession.find({ plantId: req.query.plantId }).then((session) => {
      res.send(session);
    });
  } catch (err) {
    //actually not sure if .find() will error if it doesn't find anything
    //it won't
    res.send(err);
  }
});
/* plant specific endpoints */

router.post("/plant/new", async (req, res) => {
  //WIP, end point for creating a brand new plant
  const plantName = req.body.plantName;
  const plantType = req.body.plantType;
  const subject = req.body.subject;
  const id = req.body.id;
  const stage = 0;
  const timeCreated = req.body.timeCreated; //CHANGED FROM time
  const goalTime = req.body.goalTime; //this shouldn't be a date...
  let response = [];
  if (id === "" || id === undefined) {
    response.push("creator id was not passed in...FIX THIS bc idk whose plant this is");
  }
  console.log(req.body);
  const newPlant = new Plant({
    plantName: plantName,
    plantType: plantType,
    subject: subject,
    creator_id: id,
    timeCreated: timeCreated,
    goalTime: goalTime,
    stage: stage,
    studyTimeCumul: 0,
    isStudying: false,
  });
  const plant = await newPlant.save();
  response.push(plant);
  return res.send(response);
});

router.post("/plant/update", async (req, res) => {
  //WIP, will handle any update requests for plants
  /* possible inputs (somehow forbid any others)
  body:
    {fields:
        { plantName,
          subject,
          goalTime,
          studyTimeCumul,
          stage,
          isStudying,
          homePageIndex,
        }
      }
          */
  //console.log(req.body);
  const entry = await Plant.findById(req.body.plantId);
  console.log("entry", entry);
  let response = [];
  for (obj in req.body.fields) {
    if (req.body.fields[obj] !== null || req.body.fields[obj] !== "") {
      entry[obj] = req.body.fields[obj]; //could replace this with .update() and it would be nice and clean...
      await entry.save();
      const edited = String(obj);
      console.log(String(obj));
      response.push({ edited } + " on server updated to " + entry[obj]);
    } else {
      response.push({ edited }.concat(" was empty, not updating"));
    }
  }
  return res.send(response);
});

router.get("/plant/single", (req, res) => {
  try {
    Plant.findById(req.query.plantId).then((plant) => {
      res.send(plant);
    });
  } catch (err) {
    res.send(err.concat(" Cannot find plant :("));
  }
});

router.get("/plant", (req, res) => {
  //WIP, will get all plants from user
  try {
    Plant.find({ creator_id: req.query.creatorId }).then((plants) => {
      res.send(plants);
    });
  } catch (err) {
    res.send(err);
  }
});

/* END plant specific endpoints */

router.get("/user", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send(user);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;

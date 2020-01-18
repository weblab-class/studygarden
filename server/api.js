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
const StudySession = require("./models/studytimer"); //rip file name
const Plant = require("./models/plant"); //planty bois are coming 👀
const ProfOrder = require("./models/profileorder");
// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

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

router.post("/timer", (req, res) => {
  //WIP
  const startTime = Date.now();
  const newSession = new StudyTimer({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
  });

  newStory.save().then((story) => res.send(story));
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
  const newPlant = new Plant({
    plantName: plantName,
    plantType: plantType,
    subject: subject,
    creator_id: id,
    timeCreated: timeCreated,
    goalTime: goalTime,
    stage: stage,
    studyTimeCumul: 0,
    isStudying: 0,
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
        {plant: 
          plantName,
          subject,
          goalTime,
          studyTimeIniti,
          studyTimeFinal,
          studyTimeCumul,
          stage,
          isStudying,
          homePageIndex,
        }
      }
          */
  //console.log(req.body);
  const entry = await Plant.findById(req.body.plantId);
  console.log(entry);
  let response = [];
  for (obj in req.body.fields) {
    console.log("op");
    if (req.body.fields[obj] !== null || req.body.fields[obj] !== "") {
      entry[obj] = req.body.fields[obj];
      await entry.save();
      const edited = String(obj); /* .toString(() => {
        return "" + this.name;
      }); */
      console.log(String(obj));
      response.push({ edited } + " on server updated to " + entry[obj]);
    } else {
      response.push({ edited }.concat(" was empty, not updating"));
    }
  }
  //const plant = await newPlant.save();
  return res.send(response);
});

router.get("/plant", (req, res) => {
  //WIP, will get all plants from user
  try {
    Plant.find({ creator_id: req.query.id }).then((plants) => {
      res.send(plants);
    });
  } catch (err) {
    res.send(err.concat(" | userid is invalid or user appears to have no plants!"));
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

const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  path: String,
  title: String,
  type: {
    type: String,
    default: 'Misc.',
  },
  description: String,
  progress: {
    type: Number,
    default: 0,
  },
  created: {
    type: Date,
    default: Date.now
  },
});

goalSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

goalSchema.set('toJSON', {
  virtuals: true
});


const Goal = mongoose.model('Goal', goalSchema);

// create new goal
router.post("/", validUser, upload.single('goal'), async (req, res) => {
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const goal = new Goal({
    user: req.user,
    path: "/images/" + req.file.filename,
    title: req.body.title,
    type: req.body.type,
    description: req.body.description,
  });
  try {
    await goal.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my goals
router.get("/", validUser, async (req, res) => {
  try {
    let goals = await Goal.find({
      user: req.user
    }).sort({
      created: -1
    }).populate('user');
    return res.send(goals);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all goals
router.get("/all", async (req, res) => {
  try {
    let goals = await Goal.find().sort({
      created: -1
    }).populate('user');
    return res.send(goals);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

//get a single goal by id
router.get("/:id", async (req, res) => {
  try {
    let goal = await Goal.findOne({
      _id: req.params.id
    });
    return res.send(goal);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// delete a single goal
router.delete('/:id', async (req, res) => {
  try {
      await Goal.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});

// update a single goal
router.put('/:id', async (req, res) => {
  try {
      let goal = await Goal.findOne({
        _id: req.params.id
      });
      if (!goal) {
          res.send(404);
          return;
      }
      goal.title = req.body.title;
      goal.type = req.body.type;
      goal.description = req.body.description;
      goal.progress = req.body.progress;
      await goal.save();
      res.send(goal);
  } catch (error) {
      console.log(error);
      res.sendStatus(500);
  }
});


module.exports = {
    model: Goal,
    routes: router,
}

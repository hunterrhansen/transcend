const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const goals = require("./goals.js");
const Goal = goals.model;

const updateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  goal: {
    type: mongoose.Schema.ObjectId,
    ref: 'Goal'
  },
  updateData: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Update = mongoose.model('Update', updateSchema);

// upload goal
router.post("/", validUser, async (req, res) => {
    const update = new Update({
    user: req.user,
    goal: req.body.goal,
    updateData: req.body.updateData
  });
  try {
    await update.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


// get all the updates of a goal
router.get("/:id", async (req, res) => {
  try {
    let updates = await Update.find({
      goal: req.params.id
    }).sort({
      created: -1
    }).populate('user');
    return res.send(updates);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// delete an update
router.delete('/:id', async (req, res) => {
  try {
    await Update.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Update,
  routes: router,
}

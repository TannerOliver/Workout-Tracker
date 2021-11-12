const express = require('express');
const router = require('express').Router();
const mongoose = require('mongoose');
const db = require('./models');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const opts = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false};
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bookmethod", opts);

  //  Write routes here
  app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, './public/exercise.html'))
  })
  app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, './public/stats.html'))
  })

  //  API
  //  "/api/workouts" get Last Workout
  //  /api/workouts
  app.get('/api/workouts', (req, res) => {
    db.Workout.find({})
    .then(resp => {
      res.json(resp);
    })
    .catch(err => {
      res.json(err);
    });
  });
  //  /api/workouts/" + id  "PUT" add Exercise
  // /api/workouts/:id
  app.put('/api/workouts/:id', ({body}, res) => {
    //  Need different collection name also don't know if this method will add a exercise
    db.Exercise.create(body)
      .then(({_id}) => db.Exercise.findOneAndUpdate({}, {$push: {name: _id}}, {new: true}))
      .then(resp => {
        res.json(resp);
      })
      .catch(err => {
        res.json(err);
      });
  });
  //  "/api/workouts   "POST",  Create Workout
  //  /api/workouts
  app.post('/api/workouts', (req, res) => {
    db.Workout.create(req.body)
    .then(({_id}) => db.Workout.findOneAndUpdate({}, {$push: {exercises: _id}}, {new: true}))
    .then(resp => {
      res.json(resp);
    })
    .catch(err => {
      res.json(err);
    });
  });
  //  `/api/workouts/range` no method stated  get Workouts In Range
  //  /api/workouts/range getting all of the totals for workout totals
  app.get('/api/workouts/range', (req, res) => {
    db.Workout.find({})
    .then(resp => {
      res.json(resp);
    })
    .catch(err => {
      res.json(err);
    });
  });
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
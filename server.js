const express = require('express');
const mongoose = require('mongoose');
const db = require('./models');
const Workout = require('./models/Workout');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/bookmethod", { useNewUrlParser: true });

  //  Write routes here

  //  API

  //  "/api/workouts" get Last Workout
  //  /api/workouts
  app.get('/api/workouts', ({body}, res) => {
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
  app.put('/api/workouts/:id', (req, res) => {
    //  Need different collection name also don't know if this method will add a exercise
    db.something.insert({req})
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
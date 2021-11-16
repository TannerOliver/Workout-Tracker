const express = require('express');
// const router = require('express').Router();
// const mongojs = require('mongojs')
const mongoose = require('mongoose');
const db = require('./models');
const path = require('path');


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const opts = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false};
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", opts);

  //  Write routes here
  //  Render Homepage
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
  });

  //  Render Exercise.html
  app.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, './public/exercise.html'))
  });

  //  Render  Stats.html
  app.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, './public/stats.html'))
  });

  //  get workout to display on homepage
  app.get('/api/workouts', (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: { 
          totalDuration: {
            $sum: '$exercises.duration'
          }
        }
      }
    ])
    .then(resp => {
      res.json(resp);
    })
    .catch(err => {
      res.json(err);
    });
  });

  //This is pushing a exercise into a workout
  app.put('/api/workouts/:id', (req, res) => {
    // console log different params in this if it isn't working right
    db.Workout.findByIdAndUpdate(
      req.params.id, 
      {
        $push: 
        {
          exercises: req.body
        }
      },
      {
        new: true,
        runValidators: true
      }
    )
      .then(resp => {
        res.json(resp);
      })
      .catch(err => {
        res.json(err);
      });
  });
//  This one is Creating a workout
  app.post('/api/workouts', (req, res) => {
    db.Workout.create(req.body)
    .then(resp => {
      console.log(req.body)
      res.json(resp);
    })
    .catch(err => {
      res.json(err);
    });
  });

  //  Add Agregate Tech to make this function
  app.get('/api/workouts/range', (req, res) => {
    db.Workout.aggregate([{
      $addFields: { totalDuration: {
        $sum: '$exercises.duration'
      }}
    }])
    .limit(7)
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
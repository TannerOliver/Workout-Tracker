const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Exercise = require('./Exercise');

//  Log of Workouts,  This is referencing the Exercise model   day  type Date

const WorkoutSchema = new Schema ({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [{ 
  type: {
    type: String,
    unique: false
  },
  name: {
    type: String
  },
  duration: {
    type: Number
  },
  weight: {
    type: Number
  },
  reps: {
    type: Number
  },
  sets: {
    type: Number
  },
  distance: {
    type: Number
  },
  },]
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
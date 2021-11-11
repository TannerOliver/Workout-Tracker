const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  Date, Name, Type, Weight, Sets, Reps, Duration, Distance Traveled for cardio.

const ExerciseSchema = new Schema ({
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
  date: {
    type: Date,
    defualt: Date.now
  }
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//  Log of Workouts,  This is referencing the Exercise model   day  type Date

const WorkoutSchema = new Schema ({
  day: {
    type: Date,
    defualt: Date.now
  },
  exercises: {
    type: Schema.Types.ObjectId,
      ref: "Exercise"
  }
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
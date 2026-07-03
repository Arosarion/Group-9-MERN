const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  questionsAnswered: {
    type: Number,
    required: true
  },
  correctCount: {
    type: Number,
    required: true
  },
  timeTakenSeconds: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Score", scoreSchema);

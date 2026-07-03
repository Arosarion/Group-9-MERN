const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    questionsAnswered: {
      type: Number,
      required: true,
    },
    correctCount: {
      type: Number,
      required: true,
    },
    timeTakenSeconds: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    // Distinguish between quiz and practice scores
    quizType: {
      type: String,
      enum: ["quiz", "practice"],
      default: "quiz",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Score", scoreSchema);

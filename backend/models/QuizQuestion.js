//models/QuizQuestion

const mongoose = require("mongoose");

const quizQuestionSchema = new mongoose.Schema(
    {
        topicSlug: {
            type: String,
            required: true
        },
        question: {
            type: String,
            required: true
        },
        choices: {
            type: [String],
            required: true
        },
        correctAnswer: {
            type: String,
            required: true
        },
        explanation: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("QuizQuestion", quizQuestionSchema);



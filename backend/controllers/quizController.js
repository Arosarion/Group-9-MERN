//controllers/quizController.js

const QuizQuestion = require("../models/QuizQuestion");

const getQuestionByTopic = async (req, res) => {
    try {
        const questions = await QuizQuestion.find({
            topicSlug: req.params.topicSlug,
        });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error });
    }
};
    //for creating questions with POST /api/quizzes
const createQuestion = async (req, res) => {
    try{
        const question = await QuizQuestion.create(req.body);
        res.status(201).json(question);
    } catch(error) {
        res.status(400).json({ message: error.message});
    }
};

module.exports = {
    getQuestionsByTopic,
    createQuestion
};

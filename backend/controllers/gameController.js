const QuizQuestion = require("../models/QuizQuestion");

const checkAnswer = async (req, res, next) => {
  try {
    const { questionId, selectedAnswer } = req.body;

    if (!questionId || !selectedAnswer) {
      return res.status(400).json({
        message: "questionId and selectedAnswer are required"
      });
    }

    const question = await QuizQuestion.findById(questionId);

    if (!question) {
      return res.status(404).json({
        message: "Question not found"
      });
    }

    const isCorrect =
      question.correctAnswer.trim().toLowerCase() ===
      selectedAnswer.trim().toLowerCase();

    return res.status(200).json({
      correct: isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkAnswer
};

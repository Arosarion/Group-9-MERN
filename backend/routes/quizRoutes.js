const express = require("express");
const router = express.Router();

const {
    getQuestionsByTopic,
    createQuestion
} = require("../controllers/quizController");

router.get("/:topicSlug", getQuestionsByTopic);
router.post("/", createQuestion);

module.exports = router;

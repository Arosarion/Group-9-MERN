const express = require("express");
const router = express.Router();

const {
    getTopics,
    getTopicBySlug,
    createTopic,
} = require("../controllers/topicController");

router.get("/", getTopics);
router.get("/:slug", getTopicBySlug);
router.post("/", createTopic);

module.exports = router;

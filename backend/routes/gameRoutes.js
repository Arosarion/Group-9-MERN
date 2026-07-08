const express = require("express");
const router = express.Router();

const {
  checkAnswer
} = require("../controllers/gameController");

// POST /api/game/check-answer
router.post("/check-answer", checkAnswer);

module.exports = router;

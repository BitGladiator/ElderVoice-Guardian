const express = require("express");
const { analyzeMessage } = require("../controllers/aiController");

const router = express.Router();

router.post("/analyze", analyzeMessage);

module.exports = router;
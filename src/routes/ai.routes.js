const express = require('express');
const aiController = require("../controllers/ai.controller")
const codeController = require("../controllers/code.controller");
const router = express.Router();


router.post("/get-review", aiController.getReview)
router.post("/execute-code", codeController.executeCode);

module.exports = router;    
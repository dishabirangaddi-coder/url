const express = require("express");

const {
  handleCreateURL,
  handleVisitAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleCreateURL);
router.get("/getHistory/:shortId", handleVisitAnalytics);

module.exports = router;


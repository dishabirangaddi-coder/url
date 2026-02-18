const shortid = require("shortid");
const URL = require("../models/url");

async function handleCreateURL(req, res) {
  const body = req.body;

  if (!body.url) {
    return res.status(400).json({ error: "Missing required field: url" });
  }

  const shortId = shortid.generate();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.json({ shortId });
}

async function handleRedirect(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true }
  );

  if (!result) {
    return res.status(404).json({ error: "Short ID not found" });
  }

  return res.redirect(result.redirectURL);
}

async function handleVisitAnalytics(req, res) {
  const shortId = req.params.shortId;

  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.status(404).json({ error: "Short ID not found" });
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleCreateURL,
  handleRedirect,
  handleVisitAnalytics,
};

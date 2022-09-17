const express = require("express");
const router = express.Router();
const { Campsite } = require("../../db/models");

//========= GET /api/campsites - Get all campsites =========//
router.get("/", async (req, res) => {
  const campsites = await Campsite.findAll();
  res.json(campsites);
});

module.exports = router;

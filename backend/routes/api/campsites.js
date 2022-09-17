const express = require("express");
const router = express.Router();
const { Campsite } = require("../../db/models");

//========= GET /api/campsites - Get all campsites =========//
router.get("/", async (req, res) => {
  const campsites = await Campsite.findAll();
  res.json(campsites);
});

//========= GET /api/campsites/:id - Get a single campsite =========//
router.get("/:id", async (req, res) => {
  const campsite = await Campsite.findByPk(req.params.id);
  res.json(campsite);
});

module.exports = router;

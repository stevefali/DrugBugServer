const axios = require("axios");
const express = require("express");
const router = express.Router();

const getBoxedWarningEndpoint = require("../utils/networkUtils.js");

router.get("/", async (req, res) => {
  const { interactor } = req.query;
  const medicines = [
    "tacrolimus",
    "amoxicillin",
    "ozempic",
    "zanex",
    "ursodiol",
  ]; // Hard-coded test medicines for now
  const fdaCalls = [];
  for (const medicine of medicines) {
    fdaCalls.push(async () => {
      try {
        return {
          medicine: medicine,
          resp: await axios.get(getBoxedWarningEndpoint(medicine)),
        };
      } catch (error) {
        return {
          medicine: medicine,
          resp: false,
        };
      }
    });
  }
});

module.exports = router;

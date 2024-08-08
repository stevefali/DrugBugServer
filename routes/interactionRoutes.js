const axios = require("axios");
const express = require("express");
const router = express.Router();

const getBoxedWarningEndpoint = require("../utils/networkUtils.js");
const getInteractorMatches = require("../search/interactorSearch.js");

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

  const fdaResponses = await Promise.allSettled(
    fdaCalls.map((fdaCall) => fdaCall())
  );

  const interactionsResponse = [];
  const noneFound = `No interactions with ${interactor} found.`;

  for (const fdaResponse of fdaResponses) {
    let medName = fdaResponse.value.medicine;
    if (fdaResponse.value.resp) {
      const matches = getInteractorMatches(
        fdaResponse.value.resp.data.results[0].drug_interactions[0],
        interactor
      );
      interactionsResponse.push({
        medicine: medName,
        matches: matches.length > 0 ? matches : noneFound,
      });
    } else {
      interactionsResponse.push({
        medicine: medName,
        matches: noneFound,
      });
    }
  }

  res.json({
    interactionsResponse,
    disclaimer:
      "DrugBug's drug interaction search is not meant to replace the advice of a healthcare professional. Speak to your doctor or pharmacist before making decisions regarding your health and medications.",
  });
});

module.exports = router;

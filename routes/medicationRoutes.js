const express = require("express");
const router = express.Router();
const medicationsController = require("../controllers/medicationsController");

router.route("/:medicationId").put(medicationsController.updateMedication);

router.route("/add").post(medicationsController.addMedication);
module.exports = router;

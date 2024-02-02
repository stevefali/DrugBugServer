const express = require("express");
const router = express.Router();
const medicationsController = require("../controllers/medicationsController");

router
  .route("/update/:medicationId")
  .put(medicationsController.updateMedication);

router.route("/add").post(medicationsController.addMedication);

router.route("/:medicationId").put(medicationsController.modifyMedications);
module.exports = router;

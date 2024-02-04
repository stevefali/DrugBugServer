const express = require("express");
const router = express.Router();
const medicationsController = require("../controllers/medicationsController");

router
  .route("/update/:medicationId")
  .put(medicationsController.updateMedication);

router.route("/add").post(medicationsController.addMedication);

router
  .route("/:medicationId")
  .put(medicationsController.modifyMedications)
  .delete(medicationsController.deleteMedication);

router
  .route("/medications/:userId")
  .get(medicationsController.getMedicationsForUser);
module.exports = router;

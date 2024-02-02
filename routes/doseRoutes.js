const express = require("express");
const router = express.Router();
const dosesController = require("../controllers/dosesController");

router.route("/update").put(dosesController.updateDoses);
router.route("/:doseId").delete(dosesController.deleteDose);

module.exports = router;

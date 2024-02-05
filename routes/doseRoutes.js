const express = require("express");
const router = express.Router();
const dosesController = require("../controllers/dosesController");
const authorize = require("../middleware/authorize");

router.use(authorize);

router.route("/update").put(dosesController.updateDoses);
router.route("/:doseId").delete(dosesController.deleteDose);

module.exports = router;

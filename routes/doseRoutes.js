const express = require("express");
const router = express.Router();
const dosesController = require("../controllers/dosesController");

router.route("/update").put(dosesController.updateDoses);

module.exports = router;

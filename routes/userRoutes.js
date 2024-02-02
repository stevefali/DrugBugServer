const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.route("/medications/:userId").get(usersController.getMedicationsForUser);

module.exports = router;

const express = require("express");
const app = express();
require("dotenv").config();

const doseNotification = require("./notifications/doseNotifications");
const refillNotification = require("./notifications/refillNotifications");
const dosesController = require("./controllers/dosesController");

const PORT = process.env.PORT || 8080;

app.use(express.json());

// Test routes for sending notifications. Delete later!!
app.post("/notifydose", (req, res) => {
  const { medicine, name, email } = req.body;
  try {
    doseNotification(medicine, name, email);
    res.status(200).json({ message: `Notification sent to ${email}` });
  } catch (err) {
    res.status(500).json({ message: "Error sending test notification!" });
  }
});

app.post("/notifyrefill", (req, res) => {
  const { medicine, name, amount_remaining, amount_unit, email } = req.body;
  try {
    refillNotification(medicine, name, amount_remaining, amount_unit, email);
    res.status(200).json({ message: `Notification sent to ${email}` });
  } catch (err) {
    res.status(500).json({ message: "Error sending test notification!" });
  }
});

app.get("/doses", dosesController.testGetAllDoses);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

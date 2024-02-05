require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");

const doseNotification = require("./notifications/doseNotifications");
const refillNotification = require("./notifications/refillNotifications");
const dosesController = require("./controllers/dosesController");
const medicationsController = require("./controllers/medicationsController");
const notificationScheduler = require("./scheduler/notificationsScheduler");

const PORT = process.env.PORT || 8080;

const medicationRoutes = require("./routes/medicationRoutes");
const userRoutes = require("./routes/userRoutes");
const doseRoutes = require("./routes/doseRoutes");

app.use(cors());
app.use(express.json());

app.use("/medication", medicationRoutes);
app.use("/user", userRoutes);
app.use("/dose", doseRoutes);

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
app.get("/medications", medicationsController.testGetAllMedications);

notificationScheduler.startBree();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

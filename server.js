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

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to my Express App</h1>`);
});

notificationScheduler.startBree();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

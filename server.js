const express = require("express");
const app = express();
require("dotenv").config();

const doseNotification = require("./notifications/doseNotifications");

const PORT = process.env.PORT || 8080;

app.use(express.json());

// Test route for sending notifications. Delete later!!
app.post("/notify", (req, res) => {
  const { medicine, name, email } = req.body;
  try {
    doseNotification(medicine, name, email);
    res.status(200).json({ message: `Notification sent to ${email}` });
  } catch (err) {
    res.status(500).json({ message: "Error sending test notification!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

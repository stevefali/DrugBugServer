const notificationapi = require("notificationapi-node-server-sdk").default;
require("dotenv").config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

notificationapi.init(clientId, clientSecret);

const doseNotification = (medicine, name, email) => {
  notificationapi.send({
    notificationId: "drugbug_test",
    user: {
      id: email,
      email: email,
    },
    mergeTags: {
      medicine: medicine,
      person: name,
    },
  });
};

module.exports = doseNotification;

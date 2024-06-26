const notificationapi = require("notificationapi-node-server-sdk").default;
require("dotenv").config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

notificationapi.init(clientId, clientSecret);
const refillNotification = (
  medicine,
  name,
  amount_remaining,
  amount_unit,
  email,
  user_id
) => {
  notificationapi.send({
    notificationId: "drugbug_refill",
    user: {
      id: user_id.toString(),
      email: email,
    },
    mergeTags: {
      medicine: medicine,
      person: name,
      amount_remaining: amount_remaining,
      amount_unit: amount_unit,
    },
  });
};

module.exports = refillNotification;

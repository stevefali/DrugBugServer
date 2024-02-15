const notificationapi = require("notificationapi-node-server-sdk").default;
require("dotenv").config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

notificationapi.init(clientId, clientSecret);

const doseNotification = (
  medicine,
  name,
  email,
  amount,
  amount_unit,
  user_id
) => {
  notificationapi.send({
    notificationId: "drugbug_test",
    user: {
      id: user_id.toString(),
      email: email,
    },
    mergeTags: {
      medicine: medicine,
      person: name,
      amount: amount,
      amount_unit: amount_unit,
    },
  });
  console.log("user: ", notificationapi.user);
};

module.exports = doseNotification;

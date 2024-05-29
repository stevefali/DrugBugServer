const refillNotification = require("../notifications/refillNotifications");

let {
  medicine,
  name,
  amount_remaining,
  amount_unit,
  email,
  user_id,
  refill_reminder,
} = require("node:worker_threads").workerData;

if (refill_reminder) {
  refillNotification(
    medicine,
    name,
    amount_remaining,
    amount_unit,
    email,
    user_id
  );
}

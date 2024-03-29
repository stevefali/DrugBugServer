const refillNotification = require("../notifications/refillNotifications");

let { medicine, name, amount_unit, email, refill_reminder, user_id } =
  require("node:worker_threads").workerData;

if (refill_reminder) {
  refillNotification(
    medicine,
    name,
    amount_unit,
    email,
    refill_reminder,
    user_id
  );
}

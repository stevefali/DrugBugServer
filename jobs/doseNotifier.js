const doseNotification = require("../notifications/doseNotifications");

let {
  medicine,
  name,
  email,
  amount_remaining,
  amount,
  dose_reminder,
  medication_id,
  refill_reminder,
  refill_reminder_date,
  refilled_on,
  amount_unit,
} = require("node:worker_threads").workerData;

if (dose_reminder) {
  doseNotification(medicine, name, email, amount, amount_unit);
}

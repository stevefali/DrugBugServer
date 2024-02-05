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

console.log(`${medicine}, ${name}`);

if (medicine === "Testing") {
  console.log("Test notification triggered");
} else {
  if (dose_reminder) {
    doseNotification(medicine, name, email);
  }
  if (amount_remaining >= amount) {
    const adjustedAmountRemaining = amount_remaining - amount;
    //TODO: Change amount remaining in database
  }
}

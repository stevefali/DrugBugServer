const refillNotification = require("../notifications/refillNotifications");

let { medicine, name, amount_remaining, amount_unit, email, refill_reminder } =
  require("node:worker_threads").workerData;

console.log(`${medicine}, ${name}`);

if (medicine === "Testing") {
  console.log("Test notification triggered");
} else {
  if (refill_reminder) {
    refillNotification(medicine, name, amount_remaining, amount_unit, email);
  }
}

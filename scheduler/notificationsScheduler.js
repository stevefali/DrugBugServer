const Bree = require("bree");
const path = require("path");
module.exports = {};
const dosesController = require("../controllers/dosesController");
// const medicationsController = require("../controllers/medicationsController");

const appDir = path.resolve(__dirname, "..");

let schedule = [];

const bree = new Bree({
  root: false,
  jobs: schedule,
  errorHandler: (error) => {
    console.log(error);
  },
});

const initializeBree = async () => {
  await bree.start();
  console.log("Bree starting");
};

const syncJobsFromDb = (module.exports = async () => {
  await bree.stop();

  if (bree.config.jobs.length > 0) {
    bree.config.jobs = [];
  }
  schedule = [];
  const doses = await dosesController.getAllDoses();
  doses.forEach((dose) => {
    oneTimeDate = dose.onetime_time ? new Date(dose.onetime_time) : undefined;
    schedule.push({
      name: `doseNotifier-${dose.id}`,
      path: path.join(appDir + "/jobs", "doseNotifier.js"),
      cron: dose.cron || undefined,
      date: oneTimeDate,
      worker: {
        workerData: {
          medicine: dose.medicine_name,
          name: dose.first_name,
          email: dose.email,
          amount_remaining: dose.amount_remaining,
          amount: dose.amount,
          dose_reminder: dose.dose_reminder,
          medication_id: dose.medication_id,
          refill_reminder: dose.refill_reminder,
          refill_reminder_date: dose.refill_reminder_date,
          refilled_on: dose.refilled_on,
          amount_unit: dose.amount_unit,
        },
      },
      timezone: dose.timezone,
    });
  });

  const medicationsController = require("../controllers/medicationsController");
  const medications = await medicationsController.getAllMedications();
  medications.forEach((medication) => {
    if (medication.refill_reminder) {
      schedule.push({
        name: `refillNotifier-${medication.id}`,
        path: path.join(appDir + "/jobs", "refillNotifier.js"),
        date: new Date(medication.refillReminderDate),
        worker: {
          workerData: {
            medicine: medication.medicine_name,
            name: medication.first_name,
            amount_remaining: medication.amount_remaining,
            amount_unit: medication.amount_unit,
            email: medication.email,
          },
        },
        timezone: medication.timezone,
      });
    }
  });

  await bree.add(schedule);

  console.log("bree jobs: ", bree.config.jobs.length);

  await bree.start();
});

const startBree = () => {
  initializeBree();
  syncJobsFromDb();
};

module.exports = {
  startBree,
  syncJobsFromDb,
};

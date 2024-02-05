module.exports = [
  {
    id: 1,
    medication_id: 1,
    cron: "0 19 * * *",
    amount: 2.0,
    dose_reminder: true,
  },
  {
    id: 2,
    medication_id: 1,
    cron: "0 7 * * *",
    amount: 2.0,
    dose_reminder: true,
  },
  {
    id: 3,
    medication_id: 2,
    cron: "30 12 * * *",
    amount: 2.0,
    dose_reminder: true,
  },
  {
    id: 4,
    medication_id: 2,
    onetime_time: 1708021839000,
    amount: 2.0,
    dose_reminder: true,
  },
  {
    id: 5,
    medication_id: 3,
    cron: "* * * * *",
    amount: 2.0,
    dose_reminder: true,
  },
];

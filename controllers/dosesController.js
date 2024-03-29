const knex = require("knex")(require("../knexfile"));
const notificationsScheduler = require("../scheduler/notificationsScheduler");

const getAllDoses = async () => {
  try {
    const doses = await knex("doses")
      .join("medications", "medications.id", "doses.medication_id")
      .join("users", "users.id", "medications.user_id")
      .select(
        "doses.id",
        "doses.medication_id",
        "medications.medicine_name",
        "doses.cron",
        "doses.onetime_time",
        "doses.amount",
        "doses.dose_reminder",
        "medications.amount_remaining",
        "medications.amount_unit",
        "medications.refilled_on",
        "medications.timezone",
        "users.first_name",
        "users.email",
        "medications.refill_reminder",
        "medications.refill_reminder_date",
        "medications.user_id"
      );

    return doses;
  } catch (error) {
    console.log(error);
  }
};

const updateDoses = async (req, res) => {
  const { doses } = req.body;
  try {
    let doseResult = [];
    for (let i = 0; i < doses.length; i++) {
      const queryId = doses[i].id;
      const nextDose = await knex("doses").where({ id: queryId }).update({
        cron: doses[i].cron,
        onetime_time: doses[i].onetime_time,
        amount: doses[i].amount,
        dose_reminder: doses[i].dose_reminder,
      });
      doseResult.push(nextDose);
    }

    res.status(201).json(doseResult);
    await notificationsScheduler.syncJobsFromDb();
  } catch (error) {
    res.status(500).json({ message: `Unable to update Dose! ${error}` });
  }
};

const deleteDose = async (req, res) => {
  const { doseId } = req.params;

  try {
    const deletedDose = await knex("doses").where({ id: doseId }).delete();
    if (deletedDose === 0) {
      return res
        .status(404)
        .json({ message: `Dose with id ${doseId} not found.` });
    }
    res.status(204).json({ message: "Dose deleted." });
    await notificationsScheduler.syncJobsFromDb();
  } catch (error) {
    res.status(500).json({ message: `Unable to delete dose ${doseId}` });
  }
};

module.exports = {
  // testGetAllDoses,
  getAllDoses,
  updateDoses,
  deleteDose,
};

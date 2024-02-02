const knex = require("knex")(require("../knexfile"));
const { parentPort } = require("worker_threads");
const notificationsScheduler = require("../scheduler/notificationsScheduler");

const getAllMedications = async () => {
  try {
    const medications = await knex("medications")
      .join("users", "users.id", "medications.user_id")
      .select(
        "medications.id",
        "medications.medicine_name",
        "medications.amount_remaining",
        "medications.refill_reminder",
        "medications.refill_reminder_date",
        "medications.amount_unit",
        "medications.timezone",
        "users.first_name",
        "users.email"
      );
    return medications;
  } catch (error) {
    console.log(error);
  }
};

// Testing method. Remove later!!
const testGetAllMedications = async (req, res) => {
  try {
    const medications = await knex("medications")
      .join("users", "users.id", "medications.user_id")
      .select(
        "medications.id",
        "medications.medicine_name",
        "medications.amount_remaining",
        "medications.refill_reminder",
        "medications.refill_reminder_date",
        "medications.amount_unit",
        "medications.timezone",
        "users.first_name",
        "users.email"
      );
    res.status(200).json(medications);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Problem retrieving medications from the database." });
  }
};

const updateMedicationInternal = async (
  id,
  medicine_name,
  amount_remaining,
  refill_reminder,
  refill_reminder_date,
  refilled_on,
  amount_unit,
  res
) => {
  try {
    const updatedMedication = await knex("medications")
      .where({ id: id })
      .update({
        medicine_name: medicine_name,
        amount_remaining: amount_remaining,
        refill_reminder: refill_reminder,
        refill_reminder_date: refill_reminder_date,
        refilled_on: refilled_on,
        amount_unit: amount_unit,
      });

    console.log("remaining: ", amount_remaining);

    await notificationsScheduler.syncJobsFromDb();

    if (!updatedMedication) {
      console.log(`Error updating medication with id ${id}`);
      if (res) {
        res
          .status(404)
          .json({ message: `Error, medication with id ${id} not found.` });
      }
    }

    if (res) {
      res.status(200).json({ message: `Updated medication ${medicine_name}.` });
    }
  } catch (error) {
    if (res) {
      if (error.errno === 1452) {
        return res.status(400).json({
          message: `Error: medication id ${id} not found.`,
        });
      } else {
        res.status(500).json({
          message: `Error updating database: ${error}`,
        });
      }
    }
  }
};

const updateMedication = async (req, res) => {
  const {
    medicine_name,
    amount_remaining,
    refill_reminder,
    refill_reminder_date,
    refilled_on,
    amount_unit,
  } = req.body;
  const id = req.params.medicationId;

  updateMedicationInternal(
    id,
    medicine_name,
    amount_remaining,
    refill_reminder,
    refill_reminder_date,
    refilled_on,
    amount_unit,
    res
  );
};

const addMedication = async (req, res) => {
  const { medications, doses } = req.body;
  try {
    const doseResult = [];
    const medResult = [];
    for (let i = 0; i < medications.length; i++) {
      const nextMed = await knex("medications").insert({
        id: medications[i].id,
        medicine_name: medications[i].medicine_name,
        amount_remaining: medications[i].amount_remaining,
        user_id: medications[i].user_id,
        refill_reminder: medications[i].refill_reminder,
        refill_reminder_date: medications[i].refill_reminder_date,
        timezone: medications[i].timezone,
        refilled_on: medications[i].refilled_on,
        amount_unit: medications[i].amount_unit,
      });
      medResult.push(nextMed);
    }
    for (let i = 0; i < doses.length; i++) {
      const nextDose = await knex("doses").insert({
        medication_id: doses[i].medication_id,
        cron: doses[i].cron,
        onetime_time: doses[i].onetime_time,
        amount: doses[i].amount,
        dose_reminder: doses[i].dose_reminder,
      });
      doseResult.push(nextDose);
    }

    if (medResult.length > 0) {
      const newMedicationId = medResult[0][0];
      const createdMedication = await knex("medications").where({
        id: newMedicationId,
      });
      res.status(201).json(createdMedication);
    } else {
      if (doseResult.length > 0) {
        const newDoseId = doseResult[0][0];
        const createdDose = await knex("medications").where({
          id: newDoseId,
        });
        res.status(201).json(createdDose);
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: `Unable to create new medication! ${error}` });
  }
};

const modifyMedications = async (req, res) => {
  const { medicationId } = req.params;
  try {
    const nextMed = await knex("medications")
      .where({ id: medicationId })
      .update(req.body);

    const updatedMedication = await knex("medications").where({
      id: medicationId,
    });
    res.status(201).json(updatedMedication);
  } catch (error) {
    res.status(500).json({ message: `Unable to update medication! ${error}` });
  }
};

module.exports = {
  testGetAllMedications,
  getAllMedications,
  updateMedication,
  updateMedicationInternal,
  addMedication,
  modifyMedications,
};

const knex = require("knex")(require("../knexfile"));

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

module.exports = {
  testGetAllMedications,
  getAllMedications,
};

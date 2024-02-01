const knex = require("knex")(require("../knexfile"));

// Testing method. Remove later!!
const testGetAllDoses = async (req, res) => {
  try {
    const doses = await knex("doses")
      .join("medications", "medications.id", "doses.medication_id")
      .join("users", "users.id", "medications.user_id")
      .select(
        "doses.id",
        "medications.medicine_name",
        "doses.cron",
        "doses.onetime_time",
        "doses.amount",
        "doses.dose_reminder",
        "medications.amount_remaining",
        "medications.amount_unit",
        "medications.timezone",
        "users.first_name",
        "users.email"
      );
    res.status(200).json(doses);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Problem retrieving doses from the database." });
  }
};

module.exports = {
  testGetAllDoses,
};

const knex = require("knex")(require("../knexfile"));

const getMedicationsForUser = async (req, res) => {
  const { userId } = req.params;
  try {
    let user = await knex("users").where({ id: userId });

    if (user.length < 1) {
      console.log(`Error getting user with id ${userId}`);
      res
        .status(404)
        .json({ message: `Error, user with id ${userId} not found.` });
      return;
    }

    const medications = await knex("medications").where({ user_id: userId });

    let medicationDoses = [];

    for (let i = 0; i < medications.length; i++) {
      medicationDoses.push({
        ...medications[i],
        doses: [
          ...(await knex("doses").where({
            medication_id: medications[i].id,
          })),
        ],
      });
    }
    user = { ...user, medications: medicationDoses };

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error getting data for user with ID ${userId}` });
  }
};

module.exports = {
  getMedicationsForUser,
};

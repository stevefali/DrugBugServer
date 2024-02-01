const usersData = require("../seed_data/users");
const medicationsData = require("../seed_data/medications");
const dosesData = require("../seed_data/doses");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert(usersData);
  await knex("medications").del();
  await knex("medications").insert(medicationsData);
  await knex("doses").del();
  await knex("doses").insert(dosesData);
};

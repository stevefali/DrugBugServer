exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      table.string("first_name").notNullable();
      table.string("last_name").notNullable();
      table.string("email").notNullable().unique();
      table.string("password").notNullable();
    })
    .createTable("medications", (table) => {
      table.increments("id").primary();
      table.string("medicine_name").notNullable();
      table.double("amount_remaining");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.boolean("refill_reminder").notNullable().defaultTo(false);
      table.bigInteger("refill_reminder_date");
      table.string("timezone").notNullable();
      table.bigInteger("refilled_on");
      table.string("amount_unit").notNullable();
    })
    .createTable("doses", (table) => {
      table.increments("id").primary();
      table
        .integer("medication_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("medications")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("cron");
      table.bigInteger("onetime_time");
      table.double("amount");
      table.boolean("dose_reminder").notNullable().defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("doses")
    .dropTable("medications")
    .dropTable("users");
};

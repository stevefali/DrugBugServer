const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).send("Please enter the required fields.");
  }

  const hashedPassword = bcrypt.hashSync(password);

  const newUser = {
    first_name,
    last_name,
    email,
    password: hashedPassword,
  };

  try {
    await knex("users").insert(newUser);
    res.status(201).json({
      message: `Registration successful for ${first_name} ${last_name}.`,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: `Registration failed for ${first_name} ${last_name}.` });
  }
});

module.exports = router;

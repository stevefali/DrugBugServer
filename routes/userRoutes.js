const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authorize = require("../middleware/authorize");
const notificationapi = require("notificationapi-node-server-sdk").default;
require("dotenv").config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

notificationapi.init(clientId, clientSecret);

notificationapi.init(clientId, clientSecret);

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
    const user = await knex("users").insert(newUser);
    res.status(201).json({
      message: `Registration successful for ${first_name} ${last_name}.`,
    });
    console.log(`Registered user: ${user}`);
    // const user = await knex("users").where({ email: email }).first();
    notificationapi.setUserPreferences(user.toString(), [
      {
        notificationId: "drugbug_test",
        channel: "EMAIL",
        state: false,
      },
      {
        notificationId: "drugbug_refill",
        channel: "EMAIL",
        state: true,
      },
    ]);
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: `Registration failed for ${first_name} ${last_name}.` });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Please fill all required fields.");
  }

  const user = await knex("users").where({ email: email }).first();

  if (!user) {
    return res.status(400).send("Invalid email");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );

  res.status(200).json({ token: token });
});

router.get("/current", authorize, async (req, res) => {
  try {
    const currentUser = await knex("users").where({ id: req.verId }).first();

    delete currentUser.password;

    res.json(currentUser);
  } catch (error) {
    return res.status(401).send("Invalid auth token: ");
  }
});

router.post("/webpush", authorize, async (req, res) => {
  // console.log("webPush called");
  try {
    const { endpoint, keys } = req.body;
    notificationapi.identifyUser({
      id: req.verId.toString(),
      webPushTokens: [
        {
          sub: {
            endpoint: endpoint,
            keys: keys,
          },
        },
      ],
    });
    res.status(200);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `Error setting web push tokens for user. ${error}` });
  }
});

router.delete("/delete", authorize, async (req, res) => {
  try {
    await knex("users").where({ id: req.verId }).del();
    res
      .status(204)
      .json({ message: `Successfully deleted user with id ${verId}` });
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error deleting account for user with id ${req.verId}` });
  }
});

module.exports = router;

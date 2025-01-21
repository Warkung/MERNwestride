const express = require("express");
const {
  getAllusers,
  createUser,
  getUserById,
} = require("../controller/userController");

const router = express.Router();

router.route("/users").get(getAllusers).post(createUser);
router.route("/users/:id").get(getUserById);
module.exports = router;

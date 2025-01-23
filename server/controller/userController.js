const userModel = require("../model/userModel");
const internalError = require("../utils/internalError");

const getAllusers = async (req, res) => {
  try {
    const users = await userModel.find({}).limit(req.query._end);
    res.status(200).json(users);
  } catch (error) {
    internalError(res, error);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, avatar } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res.status(200).json(user);
    }
    const newUser = new userModel({
      name,
      email,
      avatar,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    internalError(res, error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.params.id)
      .populate("allProperties");
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    internalError(res, error);
  }
};

module.exports = { getAllusers, createUser, getUserById };

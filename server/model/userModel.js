const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  allProperty: {
    type: mongoose.Schema.Types.ObjectId,
    type: Array,
    ref: "Property",
    required: false,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;

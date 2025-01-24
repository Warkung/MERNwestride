const mongoose = require("mongoose");
const PropertyModel = require("../model/propertiesModel");
const UserModel = require("../model/userModel");
const internalError = require("../utils/internalError");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a new property
const createProperty = async (req, res) => {
  try {
    const { title, description, propertyType, location, price, photo, email } =
      req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    const user = await UserModel.findOne({ email }).session(session);
    if (!user) throw new Error("User not found");
    const photoUrl = await cloudinary.uploader.upload(photo);
    const property = new PropertyModel({
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url || photo,
      creator: user._id,
    });
    user.allProperty.push(property);
    await user.save({ session });
    await session.commitTransaction();
    res.status(201).json({ message: "Property created", property });
  } catch (error) {
    await session.abortTransaction();
    internalError(res, error);
  }
};

// Get all properties
const getProperties = async (req, res) => {
  try {
    const {
      _end,
      _order,
      _sort,
      _start,
      title_like = "",
      propertyType = "",
    } = req.query;
    const query = {};
    if (title_like) {
      query.title = { $regex: title_like, $options: "i" };
    }
    if (propertyType) {
      query.propertyType = propertyType;
    }
    try {
      const count = await PropertyModel.countDocuments({ query });
      const properties = await PropertyModel.find(query)
        .sort({ [_sort]: _order === "ASC" ? 1 : -1 })
        .skip(+_start)
        .limit(+_end);
      res.header("X-Total-Count", count);
      res.header("Access-Control-Expose-Headers", "X-Total-Count");
      res.status(200).json({ message: "Properties found", properties });
    } catch (error) {}
  } catch (error) {
    internalError(res, error);
  }
};

// Get a property by ID
const getPropertyDetail = async (req, res) => {
  try {
    const property = await PropertyModel.findById(req.params.id).populate(
      "creator"
    );
    if (!property) {
      return res.status(404).send("Property not found");
    }
    res.status(200).json({ message: "Property found", property });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a property by ID
const updateProperty = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, propertyType, location, price, photo } =
      req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    await PropertyModel.findByIdAndUpdate(id, {
      title,
      description,
      propertyType,
      location,
      price,
      photo: photoUrl.url || photo,
    });
    const updatedProperty = await PropertyModel.findById(id);
    res.status(200).json({ message: "Property updated", updatedProperty });
  } catch (error) {
    internalError(res, error);
  }
};

// Delete a property by ID
const deleteProperty = async (req, res) => {
  try {
    const property = await PropertyModel.findById(req.params.id).populate(
      "creator"
    );
    if (!property) {
      return res.status(404).send("Property not found");
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    await PropertyModel.deleteOne({ _id: req.params.id }), { session };
    property.creator.allProperties.pull(property);
    await property.creator.save({ session });
    await session.commitTransaction();
    res.status(204).json({ message: "Property deleted" });
  } catch (error) {
    internalError(res, error);
  }
};

module.exports = {
  createProperty,
  getProperties,
  getPropertyDetail,
  updateProperty,
  deleteProperty,
};

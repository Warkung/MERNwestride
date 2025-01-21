const express = require("express");
const {
  getProperties,
  createProperty,
  getPropertyDetail,
  updateProperty,
  deleteProperty,
} = require("../controller/propertyController");

const router = express.Router();

router.route("/properties").get(getProperties).post(createProperty);
router
  .route("/properties/:id")
  .get(getPropertyDetail)
  .put(updateProperty)
  .delete(deleteProperty);

module.exports = router;
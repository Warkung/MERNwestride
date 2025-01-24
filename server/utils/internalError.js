const internalError = (res, error) => {
  console.error(error.message);
  return res.status(500).json({ message: "Internal server error" });
};

module.exports = internalError;

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { readdirSync } = require("fs");

const connectMongoDB = require("./mongoDB/connectMongo");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "50mb" }));

const port = process.env.PORT || 3000;

readdirSync("./routes").map((r) =>
  app.use("/api/v1", require(`./routes/${r}`))
);
app.all("*", (req, res) => {
  res.status(404).json({
    message: "Page not found",
  });
});

const startServer = async () => {
  try {
    connectMongoDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();

const mongoose = require("mongoose");
//const logger = require("./loggerWinston");

mongoose.Promise = global.Promise;
const username = process.env.DB_USER || "";
const password = process.env.DB_PASS || "";
const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || "27017";
const database = process.env.DB_NAME || "tasks";

const connString =
  process.env.DB_CONNSTR || `mongodb://${host}:${port}/${database}`;

mongoose
  .connect(connString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.info("Database connection successful");
  })
  .catch(err => {
    console.error("Database connection error", { error: err });
  });

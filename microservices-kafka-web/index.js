const express = require("express");
const app = express();
const kafka = require("kafka-node");
const fs = require("fs");
const path = require("path");

// settings
app.set("port", "4600");

// db
require("./services/remote");

// kafka subscribe
eval(fs.readFileSync(path.join(__dirname, "subscribe.js"), "utf8"));

app.listen(app.get("port"), () => {
  console.log(`server is running on port ${app.get("port")}`);
  console.log("listen...");
});

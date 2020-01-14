const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const task = new Schema(
  {
    title: String,
    complete: Boolean
  },
  { timestamp: true }
);

module.exports = mongoose.model("task", task);

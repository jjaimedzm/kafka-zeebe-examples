const mongoose = require("mongoose");
require("../models/task");
const Task = require("../models/task");
const Table = require("cli-table3");
const clear = require("clear");
const figlet = require("figlet");

module.exports.create = async task => {
  try {
    title();
    console.log("save new task");
    console.log(task);
    let t = new Task(task);
    await t.save();
    console.log("task save success !!!");
  } catch (e) {
    console.log(e);
  }
};

module.exports.allTasks = async () => {
  try {
    clear();
    title();
    let tasks = await Task.find({}, { __v: 0 });
    drawTable(tasks);
  } catch (e) {
    console.log(e);
  }
};

module.exports.update = async _id => {
  try {
    clear();
    let task = await Task.find({ _id: _id });
    drawTable(task);
  } catch (e) {
    console.log(e);
  }
};

function drawTable(tasks) {
  var table = new Table({
    head: ["_id", "title", "complete"],
    colWidths: [26, 50, 20]
  });

  tasks.forEach(task => {
    table.push([task["_id"] + "", task.title, task.complete]);
  });

  console.log(table.toString());
}

function title() {
  figlet.text(
    "Tasks",
    {
      font: "Standard",
      horizontalLayout: "default",
      verticalLayout: "default"
    },
    function(err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(data);
    }
  );
}

const program = require("commander");
const { publish, subscribe } = require("./services/kafka");
const clear = require("clear");

program
  .version("0.0.1")
  .option("-c, --newtask", "new task")
  .option("-a, --allTasks", "list all tasks")
  .option("-u, --update [id]", "update task")
  .option("-d, --delete", "delete a task")
  .parse(process.argv);

//console.log(program.opts());
//console.log(program.args.join(" "));
//console.log(program.newtask);
//console.log(program.listtasks);

// new task
if (program.newtask && program.args.length !== 0) {
  console.log("--- Create a new task ---");

  let newTask = {
    title: program.args.join(" "),
    complete: false
  };
  publish(JSON.stringify(newTask), "newTask");
} else if (program.allTasks) {
  publish("", "allTasks");
} else if (program.update) {
  console.log(program.update);
  publish(program.update, "update");
}

setTimeout(() => {
  process.exit();
}, 2000);

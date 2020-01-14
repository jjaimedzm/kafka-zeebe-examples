const program = require("commander");
const { publish, subscribe } = require("./kafka");
program
  .version("0.0.1")
  .option("-t, --topic [kafka], topic kafka, dev")
  .parse(process.argv);

const message = program.args.join(" ");
console.log("MESSAGE:", message);
console.log("TOPIC:", program.topic);

// publicación de mensaje a kafka
publish(message, program.topic);

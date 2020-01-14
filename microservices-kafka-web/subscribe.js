const kafka = require("kafka-node");
const task = require("./controller/taskController");

try {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
  let consumer = new Consumer(
    client,
    [
      { topic: "newTask", partition: 0 },
      { topic: "allTasks", partition: 0 },
      { topic: "update", partition: 0 }
    ],
    {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: "utf8",
      fromOffset: false
    }
  );

  consumer.on("message", transform);
  consumer.on("error", function(err) {
    console.log("error", err);
  });
} catch (e) {
  console.log(e);
}

function transform(data) {
  console.log(data);
  console.log(data.topic);
  let { topic, value } = data;
  if (topic === "newTask") {
    task.create(JSON.parse(value));
  } else if (topic === "allTasks") {
    task.allTasks();
  } else if (topic === "update") {
    task.update(data.value);
  }
}

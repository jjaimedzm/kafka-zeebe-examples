const kafka = require("kafka-node");

module.exports.publish = async (message, topic) => {
  const Producer = kafka.Producer;
  const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
  const producer = new Producer(client);

  producer.on("ready", async function() {
    let payloads = [
      {
        topic,
        messages: message
      }
    ];
    //console.log("publish => ", JSON.stringify(payloads, null, 4));
    producer.send(payloads, (err, data) => {
      if (err) console.log("Ocurrio un error");
      console.log("send success !!!");
      //process.exit();
    });
  });
};

module.exports.subscribe = async topic => {
  try {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
    let consumer = new Consumer(client, [{ topic: topic, partition: 0 }], {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: "utf8",
      fromOffset: false
    });

    consumer.on("message", function(message) {
      console.log("kafka-> ", message.value);
    });
    consumer.on("error", function(err) {
      console.log("error", err);
    });
  } catch (e) {
    console.log(e);
  }
};

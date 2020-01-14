const kafka = require("kafka-node");
const logger = require("./logger");

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
    console.log("publish => ", payloads[0]);
    producer.send(payloads, (err, data) => {
      if (err) console.log("Ocurrio un error");
      console.log("SE envio correctamente");
      process.exit();
    });
  });
};

module.exports.subscribe = async (topic, io) => {
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
      //console.log(message);
      //console.log("kafka-> ", message.value);
      //logger.info("Enviando mensaje al pagina web");

      io.sockets.emit("web", {
        //message: message.value
        message: JSON.stringify(message, null, 4)
      });
    });

    //this.publish(logger.info("transaccion realizada"), "log");
    consumer.on("error", function(err) {
      console.log("error", err);
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports._subscribe = async topic => {
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
      console.log(message);
      console.log("kafka-> ", message.value);
    });
    consumer.on("error", function(err) {
      console.log("error", err);
    });
  } catch (e) {
    console.log(e);
  }
};

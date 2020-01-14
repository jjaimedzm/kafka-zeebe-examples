const { subscribe } = require("./kafka");

module.exports.websocket = function(io) {
  io.on("connection", socket => {
    console.log("new connection", socket.id);

    socket.on("web", data => {
      console.log(data);
    });

    //console.count("ccc");
    subscribe("dev", io);
  });
};

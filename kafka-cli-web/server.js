const path = require("path");
const express = require("express");
const app = express();

// settings
app.set("port", process.env.PORT || 4500);

// static files
console.log(path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(app.get("port"), () => {
  console.log(`server is running in port ${app.get("port")}`);
});

const SocketIO = require("socket.io");
const io = SocketIO(server);

// websockets
require("./socket").websocket(io);

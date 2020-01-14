const { _subscribe, publish } = require("./kafka");

//_subscribe("dev");
//setTimeout(() => {

//}, 1000);

setInterval(publish("m", "dev"), 1000);

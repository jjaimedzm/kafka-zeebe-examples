const ZB = require("zeebe-node");

(async () => {
  const zbc = new ZB.ZBClient("localhost:26500");
  const topology = await zbc.topology();
  console.log(JSON.stringify(topology, null, 2));
})();

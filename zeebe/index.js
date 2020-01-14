const { ZBClient } = require("zeebe-node");
const path = require("path");

const zbc = new ZBClient();

async function main() {
  try {
    //const res_ =
    await zbc.deployWorkflow("./sample.bpmn");
    //console.log(JSON.stringify(res_, null, 2));
    const res = await zbc.createWorkflowInstance("weather-report", {
      city: "London,uk"
    });
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.error(e);
  }
}

main();

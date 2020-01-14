const { ZBClient } = require("zeebe-node");
const axios = require("axios");

const zbc = new ZBClient();
const API_KEY = "f504fb70e7c6e76703f0a88df83cdd59";

zbc.createWorker(null, "get-weather-report", async (job, complete) => {
  console.log(JSON.stringify(job, null, 2));
  const city = job.variables.city;
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    );

    const weather = res.data.weather[0];
    const weather_code = weather.id + "xx";
    console.log("///////////////////////");
    console.log(weather_code);
    complete.success({
      weather_code
    });
  } catch (e) {
    console.error("Something went wrong!");
    console.error(e);
    complete.fail(e.message);
  }
});

zbc.createWorker(null, "take-umbrella", (_, complete) => {
  console.log("----------");
  console.log(JSON.stringify(_, null, 2));
  complete.success({
    recommendation: "Take an umbrella!"
  });
});

zbc.createWorker(null, "leave-umbrella", (_, complete) => {
  console.log("+++++++++++++");
  console.log(JSON.stringify(_, null, 2));
  complete.success({
    recommendation: "Leave the umbrella at home!"
  });
});

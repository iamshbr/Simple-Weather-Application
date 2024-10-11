const express = require("express");
const https = require("https");
const app = express();
const dotenv = require("dotenv").config({ path: ".env" });
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(__dirname + "/public/"));

app.listen(3000, function () {
  console.log("Server is running on port 3000.");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.city;
  const apiKey = process.env.WEATHER_APPLICATION_API_KEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";
  https.get(url, function (response) {
    response.on("data", function (data) {
      res.setHeader("Content-Type", "application/json");
      res.json(res.statusCode === 400 ? {} : JSON.parse(data));
    });
  });
});

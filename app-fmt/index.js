const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd() + "/../.env") });
const express = require("express");
const os = require("os");

const APP_NAME = "FMT";
const APP_PORT = process.env.FMT_PORT;

const app = express();

app.get("/", function (req, res) {
  res.send(`Hello World from ${APP_NAME}`);
});

app.get("/server-info", (req, res) => {
  res.json({
    "app-name": APP_NAME,
    platform: os.platform(),
    hostname: os.hostname(),
  });
});

app.get("/ping", (req, res) => {
  res.json({
    status: "OK",
  });
});

app.get("/format", (req, res) => {
  res.json({
    format: "formatted report",
  });
});

app.listen(APP_PORT, () => {
  console.log(`${APP_NAME} service is ready on port ${APP_PORT}`);
});

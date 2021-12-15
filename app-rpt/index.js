const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd() + "/../.env") });
const express = require("express");
const os = require("os");
const axios = require("axios");

const APP_NAME = "RPT";
const APP_PORT = process.argv[2] || process.env.RPT_PORT || 80;

const SCC_URL = process.env.SCC_URL;
const FMT_PORT = process.env.FMT_PORT;

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

app.get("/print", async (req, res) => {
  const formatted = await axios.get(`${SCC_URL}:${FMT_PORT}/format`);
  res.json({
    report: `Generated report from ${os.hostname()}`,
    format: formatted.data,
  });
});

app.listen(APP_PORT, () => {
  console.log(`${APP_NAME} service is ready on port ${APP_PORT}`);
});

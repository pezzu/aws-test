const path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd() + "/../.env") });
const express = require("express");
const os = require("os");
const axios = require("axios");

const APP_NAME = "URF";
const APP_PORT = process.env.URF_PORT;

const SCC_URL = process.env.SCC_URL;
const RPT_PORT = process.argv[2] || process.env.RPT_PORT;

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

app.get("/requsition", async (req, res) => {
  const report = await axios.get(`${SCC_URL}:${RPT_PORT}/print`);
  res.json({
    requsition: "Print requsition",
    report: report.data,
  });
});

app.listen(APP_PORT, () => {
  console.log(`${APP_NAME} service is ready on port ${APP_PORT}`);
});

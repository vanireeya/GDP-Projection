const express = require("express");
const routes = require("./app/routes/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const logger = require('./app/logging/logger');
const { FRONTEND_URL, SERVER_PORT, RES_SUCCESS } = require("./app/constants/iconstants");
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  optionsSuccessStatus: RES_SUCCESS
};

let app = express();
logger.info('app created');

app.use("/static", express.static("./public"));
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));
app.set("port", SERVER_PORT);
app.use("/", express.static(path.join(__dirname, "public", "data")));
app.use("/", routes);
app.set("port", SERVER_PORT);
logger.info('app setup completed');

let server = app.listen(app.get("port"), function() {
  let port = server.address().port;
  logger.info(` Server running at: ${port}`);
});

module.exports = app;

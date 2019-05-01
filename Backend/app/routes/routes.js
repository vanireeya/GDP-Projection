const express = require("express");
const router = express.Router();
const dataFetcher = require("../controllers/dataFetcher.js");
const { DATA_FETCHER_ROUTE } = require("../constants/iconstants");
const redis = require("../controllers/cache");
const logger = require("../logging/logger");

logger.info("Inside router");
router.route(DATA_FETCHER_ROUTE).get(redis.cache, dataFetcher.getData);

module.exports = router;

const rp = require("request-promise-native");
const client = require("../connections/redis");
const logger = require("../logging/logger");
const {
  DATA_API,
  CONTENT_TYPE,
  APP_JSON,
  CACHE_TIMEOUT,
  RES_SUCCESS,
  RES_INTERNAL_SERVER_ERROR
} = require("../constants/iconstants");

module.exports.getData = async (req, res) => {
  logger.info("Inside dataFetcher getData method ");

  const options = {
    uri: DATA_API,
    json: true
  };

  try {
    logger.info("Calling Data API");
    let response = await rp(options);
    logger.info("Response received");
    //logger.info("Calling Data API");
    client.setex(req.url, CACHE_TIMEOUT, JSON.stringify(response));
    res.setHeader(CONTENT_TYPE, APP_JSON);
    res.status(RES_SUCCESS).end(JSON.stringify(response));
  } catch (error) {
    logger.error(error);
    res.status(RES_INTERNAL_SERVER_ERROR).send({ error: error.message });
  }
};

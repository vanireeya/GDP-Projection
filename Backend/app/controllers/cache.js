const redis_client = require("../connections/redis");
const { RES_UNKNOWN_ERROR, RES_SUCCESS } =require('../constants/iconstants');
const logger = require('../logging/logger');

module.exports.cache = (req, res, next) => {
  redis_client.get(req.url, (err, data) => {
    if (err) {
      res.status(RES_UNKNOWN_ERROR).send({ error: err.message });
      logger.error(err);
    }

    if (data != null) {
      logger.info("Data sent successfully from cache ==>");
      //logger.info(data);
      res.status(RES_SUCCESS).send(JSON.parse(data));
    } else {
      logger.info("Data not found in cache, fetching new data");
      next();
    }
  });
};

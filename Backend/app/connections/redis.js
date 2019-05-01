const redis = require("redis");
const logger = require("../logging/logger");
const { REDIS_PORT, RETURN_BUFFER } = require("../constants/iconstants");
const client = redis.createClient(REDIS_PORT, { RETURN_BUFFER: true });
logger.info("Redis Client Created");
module.exports = client;

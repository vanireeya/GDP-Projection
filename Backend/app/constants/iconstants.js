module.exports = {
  /* api urls */
  FRONTEND_URL: "http://localhost:3000",
  DATA_API:
    "http://api.worldbank.org/countries/USA/indicators/NY.GDP.MKTP.CD?per_page=5000&format=json",

  /** routes */
  DATA_FETCHER_ROUTE: "/api/graph",

  /** string constants */
  CONTENT_TYPE: "Content-Type",
  APP_JSON: "application/json",
  RETURN_BUFFER: "return_buffers",


  /** server port */
  SERVER_PORT: 8080,
  REDIS_PORT: 6379,

  CACHE_TIMEOUT: 5,

  /**Response status codes */
  RES_UNKNOWN_ERROR: 502,
  RES_SUCCESS: 200,
  RES_INTERNAL_SERVER_ERROR: 500
};

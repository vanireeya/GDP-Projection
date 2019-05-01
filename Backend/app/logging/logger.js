const winston = require("winston");
const { format } = winston;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      json: false,
      timestamp: true,
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:MM:SS"
        }),
        format.json()
      )
    }),
    new winston.transports.File({
      filename: __dirname + "/debug.log",
      json: false,
      timestamp: true,
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:MM:SS"
        }),
        format.json()
      )
    })
  ],
  exceptionHandlers: [
    new winston.transports.Console({ json: false, timestamp: true }),
    new winston.transports.File({
      filename: __dirname + "/exceptions.log",
      json: false,
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:MM:SS"
        }),
        format.json()
      )
    })
  ],
  exitOnError: false
});

module.exports = logger;

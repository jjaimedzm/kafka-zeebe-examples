const { createLogger, format, transports } = require("winston");
const path = require("path");

// const {
//   combine, timestamp, label, prettyPrint,
// } = format;

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.label({ label: path.basename(process.mainModule.filename) })
  ),

  transports: [
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.prettyPrint(),
        format.colorize(),
        format.printf(
          info =>
            `${info.timestamp} ${info.level}: ${JSON.stringify(
              delete info["level"] && delete info["timestamp"] ? info : info
            )}`
        )
      )
    }),
    new transports.File({
      filename: "logs_.log",
      timestamp: true
    })
  ]
});

module.exports = logger;

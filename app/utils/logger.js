var winston = require('winston')
var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: './log/logs.txt',
      colorize: false
    }),
    new winston.transports.Console({
      level: 'debug',
      colorize: true
    })
  ]
})

exports.logger = logger
exports.stream = {
  write: (message, encoding) => {
    logger.info(message)
  }
}

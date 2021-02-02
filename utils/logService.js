const winston = require('winston');
const logger = winston.createLogger({
  level: 'verbose',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.simple(),
    // winston.format.printf(info => `${info.timestamp} : ${info.level} : ${info.message}`),
  ),
  transports:[
    new winston.transports.File({ filename: 'logs/error.log' , level: 'error' }),
    new winston.transports.File({ filename: 'logs/info.log' , level: 'info' }),
  ],
});

module.exports = logger;
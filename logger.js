var path = require("path");

const fs = require("fs");

const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const loggers = (requestDate, statusCode, errorMessage) => {
  const currentDate = new Date();
  const logFileName = `${currentDate.toISOString().slice(0, 10)}.log`;
  const logFilePath = path.join(logsDir, logFileName);

  const logData = `${requestDate}, ${statusCode}, ${errorMessage}\n`;

  fs.appendFile(logFilePath, logData, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
};
module.exports = loggers;

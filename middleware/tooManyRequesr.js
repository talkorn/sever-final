const rateLimit = require("express-rate-limit");

const requestRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min in milliseconds
  max: 160,
  message:
    "our web has been blocked, you have reached maximum request . Please try again after 24 hours",
  statusCode: 429,
  headers: true,
});

const customResponseMiddleware = (req, res, next) => {
  if (res.statusCode === 429) {
    return res.status(404).json({ err: "page not found" });
  }

  // If the request was not rate-limited, continue to the next middleware or route handler
  next();
};
module.exports = { requestRateLimiter, customResponseMiddleware };

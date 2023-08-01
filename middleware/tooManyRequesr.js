const rateLimit = require("express-rate-limit");

const requestRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min in milliseconds
  max: 15,
  message:
    "our web has been blocked, you have reached maximum request . Please try again after 24 hours",
  statusCode: 429,
  headers: true,
});

const customResponseMiddleware = (req, res, next) => {
  // If the request was rate-limited, handle the custom response here
  if (res.statusCode === 429) {
    return res.status(404).json({ err: "page not found" });
  }

  // If the request was not rate-limited, continue to the next middleware or route handler
  next();
};
module.exports = { requestRateLimiter, customResponseMiddleware };

/* const requestAttempts = {};

const maxAttempts = 15;
const windowMs = 24 * 60 * 60 * 1000;
const checkRequestAttempts = (req, res, next) => {
  const email = req.body.email;

  if (requestAttempts[email]) {
    let attempts = requestAttempts[email];
    if (attempts >= maxAttempts) {
      const remainingTime =
        windowMs - (Date.now() - loginAttempts[email + "_time"]);
      if (remainingTime <= 0) {
        requestAttempts[email] = 0;
        console.log("requestAttempts", requestAttempts);
        return next();
      }
      const remainingSeconds = remainingTime / 1000;
      const remainingMinutes = Math.floor(remainingSeconds / 60);
      const remainingHours = Math.floor(remainingMinutes / 60);

      return res.status(429).json({
        message: `The user has been blocked for ${remainingHours} hours, ${
          remainingMinutes % 60
        } minutes`,
      });
    }
  }
  next();
};

const recordRequestAttempts = (req, res, next) => {
  const email = req.body.email;
  if (requestAttempts[email]) {
    requestAttempts[email] += 1;
  } else {
    requestAttempts[email] = 1;
  }

  requestAttempts[email + "_time"] = Date.now();
  next();
};

const resetRequestAttempts = (req, res, next) => {
  const email = req.body.email;

  if (requestAttempts[email]) {
    delete requestAttempts[email];
    delete requestAttempts[email + "_time"];
  }

  next();
};
module.exports = {
  checkRequestAttempts,
  recordRequestAttempts,
  resetRequestAttempts,
};
 */

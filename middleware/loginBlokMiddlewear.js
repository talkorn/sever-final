const loginAttempts = {};

const maxAttempts = 3;
const windowMs = 24 * 60 * 60 * 1000;
const checkLoginAttempts = (req, res, next) => {
  const email = req.body.email;

  if (loginAttempts[email]) {
    let attempts = loginAttempts[email];
    if (attempts >= maxAttempts) {
      const remainingTime =
        windowMs - (Date.now() - loginAttempts[email + "_time"]);
      if (remainingTime <= 0) {
        loginAttempts[email] = 0;
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

const recordFailedLoginAttempt = (req, res, next) => {
  const email = req.body.email;
  if (loginAttempts[email]) {
    loginAttempts[email] += 1;
  } else {
    loginAttempts[email] = 1;
  }

  loginAttempts[email + "_time"] = Date.now();
  next();
};

const resetLoginAttempts = (req, res, next) => {
  const email = req.body.email;

  if (loginAttempts[email]) {
    delete loginAttempts[email];
    delete loginAttempts[email + "_time"];
  }

  next();
};
module.exports = {
  checkLoginAttempts,
  recordFailedLoginAttempt,
  resetLoginAttempts,
};

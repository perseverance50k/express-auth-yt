const httpStatus = require("http-status");

const { verifyJwt } = require("../modules/auth/utils");

const authHandler = (req, res, next) => {
  const cookies = req.cookies;
  const authenticationToken = cookies["Authentication"];

  try {
    if (authenticationToken) {
      verifyJwt(authenticationToken);
      next();
    } else {
      const payload = {
        error: "Access denied!",
      };

      res.send(payload).status(httpStatus.FORBIDDEN);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  authHandler,
};

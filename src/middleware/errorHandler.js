const httpStatus = require("http-status");

const errorHandler = (err, _req, res, _next) => {
  console.error(err);

  const payload = {
    error: err.message,
  };

  res.send(payload).status(httpStatus.INTERNAL_SERVER_ERROR);
};

module.exports = {
  errorHandler,
};

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { connectDb } = require("./modules/database");
const { authRouter } = require("./modules/auth");
const { errorHandler, authHandler } = require("./middleware");

const app = express();
const PORT = process.env.PORT || 9000;

app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRouter);

// IMPORTANT: this middleware must go after the /auth routes, but before secured routes
app.use(authHandler);

app.get("/secured", (_req, res) => {
  res.send({ message: "Hello world!" }).status(200);
});

// IMPORTANT: this middleware must be the last among all app.use() and route calls
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`The server is listening on port ${PORT}`);
    });
  } catch (e) {
    console.error("Unable to start the server: ", e);
  }
};

module.exports = { startServer };

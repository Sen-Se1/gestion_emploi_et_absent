const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const mongoSanitize = require("express-mongo-sanitize");
const { xss } = require("express-xss-sanitizer");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/db");
const mountRoutes = require("./routes");

dbConnection();

const app = express();

app.use(cors());
app.options("*", cors());

app.use(compression());

app.use(express.json({ limit: "20kb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

app.use(mongoSanitize());
app.use(xss());

mountRoutes(app);


app.all("*", (req, res, next) => {
  next(new ApiError(`Je ne trouve pas cet itinéraire: ${req.originalUrl}`, 400));
});

app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Application exécutée sur le port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Éteindre....`);
    process.exit(1);
  });
});
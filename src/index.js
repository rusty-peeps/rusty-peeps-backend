import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { logStream } from "./config/logger.js";
import database from "./config/database.js";
import routes from "./routes/index.js";

dotenv.config();

const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;

const app = express();
// global.logger = logger; if you want to use enable it
database();

app.use(cors());
app.use(helmet());
app.use(morgan("combined", { stream: logStream }));
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  }),
);
app.use(`/api/${api_version}`, routes());

app.listen(port, () => {
  console.info(`Server started at ${host}:${port}/api/${api_version}/`);
});

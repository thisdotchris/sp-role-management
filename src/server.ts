import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import { LogType, Logger } from "./utils/log.util";

const logger = new Logger("Server");

export const app: Application = express();

function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // if (err) console.error(new Date(), err.stack);
  if (err) logger.log(LogType.error, JSON.stringify(err.stack));
  return next(err);
}

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    res
      .status(500)
      .json({ message: "server error, please try again later..." });
  } else {
    return next();
  }
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(methodOverride());
// add routing
import "./routes";
// error handling
app.use(logErrors);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "server running..." });
});

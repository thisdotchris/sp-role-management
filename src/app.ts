import { LogType, Logger } from "./utils/log.util";
import { app } from "./server";
import "./connections/redis.connection";

const logger = new Logger("app");

app.listen(2020, "localhost", () => {
  logger.log(LogType.info, "server running on port 2020...");
});

import { promisify } from "util";
import { createClient, RedisClient, ClientOpts } from "redis";
import { LogType, Logger } from "./../utils/log.util";

const logger = new Logger("redis");

const opt: ClientOpts = {};

export const client: RedisClient = createClient(opt);
export const delAsync = promisify(client.HDEL).bind(client);
export const getAsync = promisify(client.HGET).bind(client);
export const setAsync = promisify(client.HSET).bind(client);
export const getAllAsync = promisify(client.HGETALL).bind(client);

export const pub: RedisClient = createClient(opt);
export const sub: RedisClient = createClient(opt);

function events(connectionName: string, _: RedisClient): void {
  _.on("ready", () =>
    logger.log(LogType.debug, `${connectionName} connection ready...`)
  );
  _.on("error", (e) =>
    logger.log(
      LogType.debug,
      `${connectionName} connection error: ${JSON.stringify(e)}`
    )
  );
}

events("client", client);
events("pub", pub);
events("sub", sub);

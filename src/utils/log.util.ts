import chalk from "chalk";

export enum LogType {
  error = "error",
  info = "info",
  warn = "warn",
  debug = "debug",
  log = "log",
}

enum LogTypeColor {
  error = "red",
  info = "green",
  warn = "yellow",
  debug = "blue",
  log = "white",
}

export class Logger {
  constructor(private title: string) {}
  log(type: LogType, content: string): void {
    console[type](
      new Date(),
      `<${type.toUpperCase()}>`,
      `[${this.title.toUpperCase()}]`,
      chalk[LogTypeColor[type]](content)
    );
  }
}

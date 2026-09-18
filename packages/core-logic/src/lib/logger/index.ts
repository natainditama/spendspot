import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

/** Application-wide structured logger powered by Pino. */
export const logger = pino({
  name: "spendspot",
  level: isDevelopment ? "debug" : "warn",
  ...(isDevelopment && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:HH:MM:ss.l",
        ignore: "pid,hostname",
        messageFormat: "[{name}] {msg}",
      },
    },
  }),
});

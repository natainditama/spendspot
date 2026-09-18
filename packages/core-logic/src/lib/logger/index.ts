import pino from "pino";

const isDevelopment = process.env.NODE_ENV !== "production";

/**
 * Application-wide structured logging client powered by Pino engine. Outputs
 * formatted readable logs in development and structured JSON in production.
 */
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

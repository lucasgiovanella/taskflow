import { transports, format } from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as path from 'path';

export const LoggerFactory = (appName: string) => {
  let consoleFormat;

  const DEBUG = process.env.DEBUG;
  const USE_JSON_LOGGER = process.env.USE_JSON_LOGGER;

  const errorFormat = format((info) => {
    if (info.level === 'error') {
      info.message = `🔴 ${info.message}`;
    }
    return info;
  })();

  const warnFormat = format((info) => {
    if (info.level === 'warn') {
      info.message = `🟡 ${info.message}`;
    }
    return info;
  })();

  if (USE_JSON_LOGGER === 'true') {
    consoleFormat = format.combine(
      format.ms(),
      format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
      }),
      errorFormat,
      warnFormat,
      format.json(),
    );
  } else {
    consoleFormat = format.combine(
      format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
      }),
      format.ms(),
      errorFormat,
      warnFormat,
      nestWinstonModuleUtilities.format.nestLike(appName, {
        colors: true,
        prettyPrint: true,
      }),
    );
  }

  return WinstonModule.createLogger({
    level: DEBUG ? 'debug' : 'info',
    transports: [
      new transports.Console({ format: consoleFormat }),
      new transports.File({ filename: path.join(__dirname, 'app.log'), format: consoleFormat })
    ],
  });
};

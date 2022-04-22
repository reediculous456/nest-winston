/* eslint @typescript-eslint/explicit-module-boundary-types: 'off' */
import { Logger } from 'winston';
import { LoggerMessage } from './winston.interfaces';
import { LoggerService } from '@nestjs/common';

export class WinstonLogger implements LoggerService {
  private context?: string;

  constructor(private readonly logger: Logger) { }

  public setContext(context: string) {
    this.context = context;
  }

  public log(message: LoggerMessage, context?: string): any {
    context = context || this.context;

    if('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.info(msg as string, { context, ...meta });
    }

    return this.logger.info(message, { context });
  }

  public error(message: LoggerMessage, trace?: string, context?: string): any {
    context = context || this.context;

    if(message instanceof Error) {
      // @ts-expect-error if message is an Error, it is an object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message: msg, name, stack, ...meta } = message;

      return this.logger.error(msg, { context, stack: [trace || message.stack], ...meta });
    }

    if('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.error(msg as string, { context, stack: [trace], ...meta });
    }

    return this.logger.error(message, { context, stack: [trace] });
  }

  public warn(message: LoggerMessage, context?: string): any {
    context = context || this.context;

    if('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.warn(msg as string, { context, ...meta });
    }

    return this.logger.warn(message, { context });
  }

  public debug?(message: LoggerMessage, context?: string): any {
    context = context || this.context;

    if('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.debug(msg as string, { context, ...meta });
    }

    return this.logger.debug(message, { context });
  }

  public verbose?(message: LoggerMessage, context?: string): any {
    context = context || this.context;

    if('object' === typeof message) {
      const { message: msg, ...meta } = message;

      return this.logger.verbose(msg as string, { context, ...meta });
    }

    return this.logger.verbose(message, { context });
  }
}

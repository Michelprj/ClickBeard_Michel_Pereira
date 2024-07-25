import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AppError } from '../errors/app-error';

@Injectable()
export class AppErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        if (err instanceof AppError) {
          response.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            error: 'AppError',
          });
        } else if (err instanceof HttpException) {
          const status = err.getStatus();
          const errorResponse = err.getResponse();

          let message;
          let error;

          if (typeof errorResponse === 'string') {
            message = errorResponse;
            error = 'HttpException';
          } else if (errorResponse && typeof errorResponse === 'object') {
            message = (errorResponse as any).message || 'An error occurred';
            error = (errorResponse as any).error || 'HttpException';
          } else {
            message = 'An error occurred';
            error = 'HttpException';
          }

          response.status(status).json({
            statusCode: status,
            message: message,
            error: error,
          });
        } else {
          console.error(err);
          response.status(500).json({
            statusCode: 500,
            message: `Internal server error: ${err.message}`,
            error: 'InternalServerError',
          });
        }

        return throwError(() => err);
      }),
    );
  }
}

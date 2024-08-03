import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class LoggingFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const responseBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message:
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal server error',
    }

    var errStack: any = null
    if (exception instanceof Error) {
      errStack = exception.stack
    }

    // 요청 및 응답 로깅
    console.error({
      request: {
        // headers: request.headers,
        body: request.body,
        method: request.method,
        url: request.url,
      },
      response: responseBody,
      stack: errStack, 
    })

    response.status(status).json(responseBody)
  }
}

import {
  Controller,
  Get,
  Post,
  Header,
  HttpCode,
  HttpStatus,
  Req,
  HttpException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('Content-Type', 'text/plain')
  getHello(@Req() req: Request): string {
    const acceptHeader = req.headers['accept'];
    if (
      acceptHeader &&
      acceptHeader !== '*/*' &&
      !acceptHeader.includes('text/plain')
    ) {
      throw new HttpException('Not Acceptable', HttpStatus.NOT_ACCEPTABLE);
    }
    return this.appService.getHello();
  }

  @Post()
  @HttpCode(HttpStatus.METHOD_NOT_ALLOWED)
  postNotAllowed(): string {
    return 'Method Not Allowed';
  }

  @Get('health')
  healthCheck(): string {
    return 'OK';
  }
}

import type { Response } from 'express';
import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { createResponse } from './common/filters/response.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: Response) {
    const result = this.appService.getHello();
    return res.status(result.statusCode).json(createResponse(result));
  }

  @Get('status')
  getStatus(@Res() res: Response) {
    const result = this.appService.getStatus();
    return res.status(result.statusCode).json(createResponse(result));
  }

  @Get('error-sample')
  getErrorSample(@Res() res: Response) {
    const result = this.appService.getErrorSample();
    return res.status(result.statusCode).json(createResponse(result));
  }
}

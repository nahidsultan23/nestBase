import { Controller, Get } from '@nestjs/common';
import type { ApiResponse } from './config.interface';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiResponse {
    return this.appService.getHello();
  }

  @Get('status')
  getStatus(): ApiResponse {
    return this.appService.getStatus();
  }
}

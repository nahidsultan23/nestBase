import { Injectable } from '@nestjs/common';
import { envVariables, createResponse } from './config';
import type { ApiResponse } from './config.interface';

@Injectable()
export class AppService {
  getHello(): ApiResponse {
    const message = `Hello World! Running on ${envVariables.application.appName} v${envVariables.application.appVersion}`;
    return createResponse(200, message, {
      appName: envVariables.application.appName,
      appVersion: envVariables.application.appVersion,
    });
  }

  getStatus(): ApiResponse {
    return createResponse(200, 'Server is running', {
      environment: envVariables.environment.nodeEnv,
      appName: envVariables.application.appName,
      appVersion: envVariables.application.appVersion,
    });
  }
}

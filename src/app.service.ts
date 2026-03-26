import { HttpStatus, Injectable } from '@nestjs/common';
import { envVariables } from './config';
import { ImethodCommonResponse } from './common/interfaces/common.interface';

@Injectable()
export class AppService {
  getHello(): ImethodCommonResponse {
    const res = {
      statusCode: HttpStatus.OK,
      message: `Hello World! Server is running on ${envVariables.application.appName} v${envVariables.application.appVersion}`,
    };

    return res;
  }

  getStatus(): ImethodCommonResponse {
    const res = {
      statusCode: HttpStatus.OK,
      message: 'Server is running',
      data: {
        environment: envVariables.environment.nodeEnv,
        appName: envVariables.application.appName,
        appVersion: envVariables.application.appVersion,
      },
    };

    return res;
  }

  getErrorSample(): ImethodCommonResponse {
    const res = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed',
      errors: {
        email: ['Email is required', 'Email format is invalid'],
        password: [
          'Password is required',
          'Password must be at least 8 characters',
        ],
      },
    };

    return res;
  }
}

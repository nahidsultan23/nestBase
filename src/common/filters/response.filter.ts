import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';
import {
  IApiResponse,
  ICreateResponseParams,
} from './response.filter.interface';
import { getTimestamp } from '../../utils/helper.util';

/**
 * Response Formatter
 * Utility for creating standardized API response objects across the application.
 * Used by controllers and exception filters to maintain consistent response structure.
 */
export const createResponse = <T = any>(
  params: ICreateResponseParams<T>,
): IApiResponse<T> => {
  const { statusCode, message, data = null, errors = null } = params;

  const response: IApiResponse<T> = {
    status: statusCode >= HttpStatus.BAD_REQUEST ? 'error' : 'success',
    statusCode,
    message,
    data,
    errors,
    meta: {
      timestamp: getTimestamp(),
    },
  };

  return response;
};

export const globalPipeResponse = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  exceptionFactory: (errors) => {
    const res = {
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Validation failed',
      errors: {},
    };

    const formatErrors = (errors: any[], parentPath = '') => {
      errors.forEach((error) => {
        const { property, constraints, children } = error;
        const fullPath = parentPath ? `${parentPath}.${property}` : property;

        if (constraints) {
          // Get all error messages for the field
          res.errors[fullPath] = Object.values(constraints);
        }

        if (children && children.length > 0) {
          formatErrors(children, fullPath);
        }
      });
    };

    formatErrors(errors);

    const formattedResponse = createResponse(res);
    return new HttpException(formattedResponse, res.statusCode);
  },
});

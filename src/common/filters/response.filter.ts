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
    status: statusCode >= 400 ? 'error' : 'success',
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

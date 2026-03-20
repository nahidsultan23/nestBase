/**
 * Standard API Response Interface
 * All API responses must follow this structure
 */
export interface IApiResponse<T = any> {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  data: T | null;
  errors: Record<string, string[]> | null;
  meta: {
    timestamp: string;
  };
}

/**
 * Parameters for creating a standardized API response
 */
export interface ICreateResponseParams<T = any> {
  statusCode: number;
  message: string;
  data?: T | null;
  errors?: Record<string, string[]> | null;
}

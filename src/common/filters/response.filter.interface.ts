/**
 * Standard API Response Interface
 * All API responses must follow this structure
 */
export interface IApiResponse {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  data: Record<string, any>;
  errors: Record<string, string[]> | null;
  meta: {
    timestamp: string;
  };
}

/**
 * Parameters for creating a standardized API response
 */
export interface ICreateResponseParams {
  statusCode: number;
  message: string;
  data?: Record<string, any>;
  errors?: Record<string, string[]> | null;
}

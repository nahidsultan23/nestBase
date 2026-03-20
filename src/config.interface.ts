/**
 * Standard API Response Interface
 * All API responses must follow this structure
 */
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  statusCode: number;
  message: string;
  data: T | null;
  errors: Record<string, string[]> | null;
  meta: {
    timestamp: string;
  };
}

/**
 * Common API Response Interface
 * Base interface for standardized API responses across the application
 * Provides consistent structure for all endpoint responses
 */
export interface ImethodCommonResponse<T = Record<string, any>> {
  statusCode: number;
  message: string;
  data?: T | null;
  errors?: Record<string, string[]> | null;
}

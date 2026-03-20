/**
 * Common API Response Interface
 * Base interface for standardized API responses across the application
 * Provides consistent structure for all endpoint responses
 */
export interface ImethodCommonResponse {
  statusCode: number;
  message: string;
  data?: Record<string, string>;
  errors?: Record<string, string[]>;
}

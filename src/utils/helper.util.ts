/**
 * Generates an ISO 8601 timestamp for response metadata
 * @returns ISO 8601 formatted timestamp string
 */
export const getTimestamp = (): string => {
  return new Date().toISOString();
};

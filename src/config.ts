import * as dotenv from 'dotenv';
import { ApiResponse } from './config.interface';
import { getTimestamp } from './utils/helper.util';

dotenv.config();

// Environment variables from .env file
export const envVariables = {
  environment: {
    nodeEnv: process.env.NODE_ENV,
  },
  server: {
    port: process.env.PORT,
  },
  application: {
    appName: process.env.APP_NAME,
    appVersion: process.env.APP_VERSION,
  },
  mongoDbConfiguration: {
    mongoDbDatabase: process.env.MONGODB_DATABASE,
    mongoDbUser: process.env.MONGODB_USER,
    mongoDbPassword: process.env.MONGODB_PASSWORD,
    mongoDbHost: process.env.MONGODB_HOST,
    mongoDbCluster: process.env.MONGODB_CLUSTER,
  },
};

export const mongoDbUri = `mongodb+srv://${envVariables.mongoDbConfiguration.mongoDbUser}:${envVariables.mongoDbConfiguration.mongoDbPassword}@${envVariables.mongoDbConfiguration.mongoDbHost}/${envVariables.mongoDbConfiguration.mongoDbDatabase}?retryWrites=true&w=majority&appName=${envVariables.mongoDbConfiguration.mongoDbCluster}`;

// Response Structure
export const createResponse = <T = any>(
  statusCode: number,
  message: string,
  data: T | null = null,
  errors: Record<string, string[]> | null = null,
): ApiResponse<T> => ({
  status: statusCode >= 400 ? 'error' : 'success',
  statusCode,
  message,
  data,
  errors,
  meta: {
    timestamp: getTimestamp(),
  },
});

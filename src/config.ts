import * as dotenv from 'dotenv';

dotenv.config();

// Environment variables from .env file
export const envVariables = {
  environment: {
    nodeEnv: process.env.NODE_ENV || 'unknown',
  },
  server: {
    port: process.env.PORT || '0',
  },
  cors: {
    allowedOrigins: process.env.CORS_ALLOWED_ORIGINS
      ? process.env.CORS_ALLOWED_ORIGINS.split(',').map((origin) =>
          origin.trim(),
        )
      : [],
  },
  application: {
    appName: process.env.APP_NAME || 'unknown',
    appVersion: process.env.APP_VERSION || 'unknown',
  },
  mongoDbConfiguration: {
    mongoDbDatabase: process.env.MONGODB_DATABASE || '',
    mongoDbUser: process.env.MONGODB_USER || '',
    mongoDbPassword: process.env.MONGODB_PASSWORD || '',
    mongoDbHost: process.env.MONGODB_HOST || '',
    mongoDbCluster: process.env.MONGODB_CLUSTER || '',
  },
};

export const mongoDbUri = `mongodb+srv://${envVariables.mongoDbConfiguration.mongoDbUser}:${envVariables.mongoDbConfiguration.mongoDbPassword}@${envVariables.mongoDbConfiguration.mongoDbHost}/${envVariables.mongoDbConfiguration.mongoDbDatabase}?retryWrites=true&w=majority&appName=${envVariables.mongoDbConfiguration.mongoDbCluster}`;

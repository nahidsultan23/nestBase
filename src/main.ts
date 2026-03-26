import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import sanitize from 'mongo-sanitize';
import type { Request, Response, NextFunction } from 'express';
import { AppModule } from './app.module';
import { envVariables } from './config';
import { globalPipeResponse } from './common/filters/response.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security: mongo-sanitize must be applied before other middleware to prevent NoSQL injection
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.body && typeof req.body === 'object') {
      req.body = sanitize(req.body);
    }
    if (req.params && typeof req.params === 'object') {
      req.params = sanitize(req.params);
    }
    next();
  });

  // Security: Use helmet to set various HTTP headers
  app.use(helmet());

  // Security: Configure CORS with allowed origins from environment
  const allowedOrigins = envVariables.cors.allowedOrigins;
  if (allowedOrigins.length > 0) {
    app.enableCors({
      origin: allowedOrigins,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  }

  app.useGlobalPipes(globalPipeResponse);

  const port = parseInt(envVariables.server.port, 10);
  await app.listen(port);
  console.log(
    `✓ ${envVariables.application.appName} v${envVariables.application.appVersion} running on port ${port}`,
  );
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envVariables } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = parseInt(envVariables.server.port || '0', 10);
  await app.listen(port);
  console.log(
    `✓ ${envVariables.application.appName} v${envVariables.application.appVersion} running on port ${port}`,
  );
}
bootstrap();

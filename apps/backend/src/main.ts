import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const appUrl = (await app.getUrl()).replace("[::1]", "localhost");
  console.log(`\n-----------------------------------------------------\n`);
  console.log(`Server is listening on: ${appUrl}`);
  console.log(`Playground is listening on: ${appUrl}/graphql`);
  console.log(`\n-----------------------------------------------------\n`);
}
bootstrap();

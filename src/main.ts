import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, HttpStatus, ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      return new BadRequestException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Erro na validação do conteúdo do body',
        error: 'Unprocessable Entity',
        details: errors
      });
    }
  }));

  await app.listen(process.env.PORT || 3000);
  
}
bootstrap();

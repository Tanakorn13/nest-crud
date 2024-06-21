import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Nest CRUD')
    .setDescription('The Nest API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      // operationsSorter:'alpha',
    }
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ตัด properties ของข้อมูลที่ส่งเข้ามาที่ไม่ได้นิยามไว้ใน dto ออกไป
      forbidNonWhitelisted: true, // ตัวเลือกนี้จะทำงานคู่กับ whitelist โดยหากตั้งค่าเป็น true จะทำให้เกิด error ในกรณีนี้มี properties ใดที่ไม่ได้อยู่ใน whitelist ส่งเข้ามา
      transform: true, // ตัวเลือกนี้ทำให้เกิดการแปลงชนิดข้อมูลอัตโนมัติ ในข้อมูลจากภายนอกให้ตรงกับชนิดที่นิยามไว้ใน DTO
      exceptionFactory: (errors) => {
        // ตัวเลือกนี้ทำให้สามารถกำหนดรูปแบบของ error response เมื่อการตรวจ validation ล้มเหลวได้
        const messages = errors.map((error) => ({
          field: error.property,
          message: Object.values(error.constraints).join('. ') + '.',
        }));
        return new BadRequestException({ errors: messages });
      },
    }),
  );
  await app.listen(5000);
}
bootstrap();

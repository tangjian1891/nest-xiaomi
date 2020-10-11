import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
var hbs= require('hbs')
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  console.log(__dirname)
  console.log( './views/admin/public')
  // hbs.registerPartials(__dirname + '/views/admin/public', function (err) {
  hbs.registerPartials('./views/admin/public', function (err) {
    console.log('有错误吗',err)
  });
  await app.listen(3000);
  console.log('http://localhost:3000')
}
bootstrap();

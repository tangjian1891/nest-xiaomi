import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
var hbs = require('hbs');
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  console.log(__dirname);
  console.log('./views/admin/public');

  // 配置cookie中间件
  app.use(cookieParser('this is cookie'));

  // 配置session中间件
  app.use(
    expressSession({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
      cookie: { maxAge: 219000, httpOnly: true },
      rolling: true,
    }),
  );

  // hbs.registerPartials(__dirname + '/views/admin/public', function (err) {
  hbs.registerPartials('./views/admin/public', function(err) {
  });
  await app.listen(3000);
  console.log('http://localhost:3000');
}
bootstrap();

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
import { ToolsService } from './service/tools/tools.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [AdminModule, DefaultModule, ApiModule,MongooseModule.forRoot('mongodb://test:123456@106.54.139.232:27017?authSource=test')],
  controllers: [],
  providers: [ToolsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('admin/*');
  }
}

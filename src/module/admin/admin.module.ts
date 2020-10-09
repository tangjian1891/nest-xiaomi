import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { MainController } from './main/main.controller';

@Module({
  controllers: [LoginController  , ManagerController, MainController]
})
export class AdminModule {}

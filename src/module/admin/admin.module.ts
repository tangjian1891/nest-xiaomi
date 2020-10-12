import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { MainController } from './main/main.controller';
import {ToolsService} from '../../service/tools/tools.service'
@Module({
  controllers: [LoginController  , ManagerController, MainController],
  providers:[ToolsService]
})
export class AdminModule {}

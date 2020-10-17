import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { MainController } from './main/main.controller';
import {ToolsService} from '../../service/tools/tools.service'
import { AdminSchema} from '../../schema/admin.schema'
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from 'src/service/admin/admin.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'Admin',schema:AdminSchema,collection:"admin"}])],
  controllers: [LoginController  , ManagerController, MainController],
  providers:[ToolsService,AdminService]
})
export class AdminModule {}

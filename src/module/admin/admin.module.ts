import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import {ToolsService} from '../../service/tools/tools.service'
import { AdminSchema} from '../../schema/admin.schema'
import { MongooseModule } from '@nestjs/mongoose';
import { AdminService } from 'src/service/admin/admin.service';

@Module({
  imports:[MongooseModule.forFeature([{name:'Admin',schema:AdminSchema,collection:"admin"}])],
  controllers: [LoginController  , ManagerController],
  providers:[ToolsService,AdminService]
})
export class AdminModule {}

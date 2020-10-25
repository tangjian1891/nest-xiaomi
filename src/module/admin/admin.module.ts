import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { ToolsService } from '../../service/tools/tools.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../../schema/user.schema';
import { RoleSchem, Role } from 'src/schema/role.schema';
import { AdminService } from 'src/service/admin/admin.service';
import { RoleService } from 'src/service/role/role.service';
import { RoleController } from './role/role.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: User.name },
      { name: Role.name, schema: RoleSchem, collection: Role.name },
    ]),
  ],
  controllers: [LoginController, ManagerController, RoleController],
  providers: [ToolsService, AdminService, RoleService],
})
export class AdminModule {}

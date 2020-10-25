import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { ToolsService } from '../../service/tools/tools.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from '../../schema/user.schema';
import { RoleSchema, Role } from 'src/schema/role.schema';
import { RoleService } from 'src/service/admin/role/role.service';
import { RoleController } from './role/role.controller';
import { UserController } from './user/user.controller';
import { AdminService } from 'src/service/admin/admin.service';
import { UserService } from 'src/service/admin/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Role.name, schema: RoleSchema, collection: Role.name },
      { name: User.name, schema: UserSchema, collection: User.name },
    ]),
  ],
  controllers: [
    LoginController,
    ManagerController,
    RoleController,
    UserController,
  ],
  providers: [ToolsService, AdminService, RoleService,UserService],
})
export class AdminModule {}

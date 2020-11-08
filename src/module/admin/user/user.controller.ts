import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Response,
} from '@nestjs/common';
import { RoleService } from 'src/service/admin/role/role.service';
import { UserService } from 'src/service/admin/user/user.service';
import { ToolsService } from 'src/service/tools/tools.service';

@Controller('admin/user')
export class UserController {
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private toolService: ToolsService,
  ) {}

  @Get('index')
  @Render('admin/user/user.hbs')
  async find() {
    // 获取用户列表
    // const data = await this.userService.find();
    const user = await this.userService.getModel().aggregate([
      {
        $lookup: { from: "role", localField: "role_id", foreignField: "_id", as: "role" } 
        // $lookup: {
        //   from: 'role',
        //   localField: 'role_id',
        //   foreignField: '_id',
        //   as: 'role',
        // },
      },
    ]);

    return {
      data: user,
      haha:[
        {name:"第一个啊"}
      ]
    };
  }
  @Get('edit')
  @Render('admin/user/edit.hbs')
  async edit(@Query('id') id) {
    // 获取单个用户列表
    const data = await this.userService.find({ _id: id });
    // 获取角色
    const roleData = await this.roleService.find();
    return {
      data: data[0],
      roleData,
    };
  }

  /**
   * 修改动作
   */
  @Post('doEdit')
  @Render('admin/user/edit.hbs')
  async doEdit(@Body() body, @Response() res) {
    if (body.password) {
      body.password = this.toolService.getMd5(body.password);
    }
    // 获取单个用户列表
    const data = await this.userService.update({ _id: body._id }, body);
    res.redirect('/admin/user/index');
  }

  /**
   * 添加页面
   */
  @Get('add')
  @Render('admin/user/add.hbs')
  async add() {
    // 获取角色列表
    const role = await this.roleService.find();
    // const data = await this.userService.find();
    return { role };
  }

  /**
   * 添加数据
   */
  @Post('doAdd')
  // @Render('admin/user/index.hbs')
  async doAdd(@Body() body, @Response() res) {
    if (body.password) {
      body.password = this.toolService.getMd5(body.password);
    }
    const data = await this.userService.save(body);

    res.redirect('/admin/user/index');
  }

  /**
   * 删除用户
   */
  @Get('delete')
  async delete(@Query('id') id, @Response() res) {
    await this.userService.delete({ _id: id });

    res.redirect('/admin/user/index');
  }
}

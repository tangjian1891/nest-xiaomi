import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Response,
} from '@nestjs/common';
import { RoleService } from 'src/service/role/role.service';

@Controller('admin/role')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  @Render('admin/role/index')
  async index() {
    const result = await this.roleService.find();
    return {
      roleList: result,
    };
  }

  @Get('add')
  @Render('admin/role/add')
  async add() {
    // const result = await this.roleService.find();
    // return {
    //   roleList: result,
    // };
    return {};
  }

  @Post('doAdd')
  async addDo(@Body() body, @Response() res) {
    if (!body.title) {
      res.render('admin/public/error', {
        redirectUrl: '/admin/role',
        message: '请输入title',
      });
      return;
    }
    const result = await this.roleService.save(body);
    if (result) {
      res.render('admin/public/success', {
        redirectUrl: '/admin/role',
      });
    } else {
      res.render('admin/public/error', {
        redirectUrl: '/admin/role',
      });
    }
  }

  @Get('edit')
  @Render('admin/role/edit')
  async edit(@Query('id') id) {
    const result = await this.roleService.find({ _id: id });
    if (result && result.length > 0) {
      return {
        role: result[0],
      };
    }
  }
  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    const result = await this.roleService.update({ _id: body._id }, body);
    console.log(result);

    res.redirect('/admin/role');
  }

  @Get('delete')
  async delete(@Query('id') id, @Response() res) {
    const result = await this.roleService.delete({ _id: id });
    res.redirect('/admin/role');
  }

  // @Get('add')
  // async addData() {
  //   return await this.roleService.addData();
  // }
}

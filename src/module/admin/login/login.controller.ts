import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Request,
  Response,
} from '@nestjs/common';
import { AdminService } from '../../../service/admin/admin.service';
import { ToolsService } from '../../../service/tools/tools.service';

@Controller('admin')
export class LoginController {
  constructor(
    private toolsService: ToolsService,
    private adminService: AdminService,
  ) {}
  @Get('login')
  @Render('admin/login.hbs')
  async index() {
    return { name: '你好啊' };
  }

  @Get('code')
  async verify(@Request() req, @Response() res) {
    const svgCaptcha = await this.toolsService.getCaptcha();
    req.session.code = svgCaptcha.text;
    console.log("当前验证码",req.session.code)
    res.type('image/svg+xml');
    res.send(svgCaptcha.data);
  }

  @Post('login/doLogin')
  async doLogin(@Body() body, @Request() req, @Response() res) {
    const { username, password, code } = body;
    if (code.toUpperCase() === req.session.code.toUpperCase()) {
      const user = await this.adminService.find({
        username,
        password: this.toolsService.getMd5(password),
      });

      if (user.length > 0) {
        // 将信息存储到sesssion中
        req.session.userInfo = user[0];
        // 前往登录页面
        console.log("重定向了")
        res.redirect('/admin/main/index'); //重定向，绝对路径，不然会追加
      } else {
        this.toolsService.error(res, {
          redirectUrl: 'admin/public/error',
          message: '账号或密码错误',
        });
      }
    } else {
      console.log('验证码不正确');

      this.toolsService.error(res, {
        redirectUrl: 'admin/public/error',
        message: '验证码不正确',
      });
    }
  }

  @Get('loginOut')
  loginOut(@Request() req, @Response() res) {
    req.session.userinfo = null;
    res.redirect('/admin/login');
  }

  // @Get('add')
  // async add(){
  //     // 添加mongo数据
  //    await this.adminService.addData({username:"admin",password:this.toolsService.getMd5('123456')})

  //   return 'ok'
  // }
}

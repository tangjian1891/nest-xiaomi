import {
  Body,
  Controller,
  Get,
  Next,
  Post,
  Query,
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

  /**
   * 跳转 登录页面
   */
  @Get('login')
  @Render('admin/login/login.hbs')
  async toLogin(@Query('type') type) {
    let message=""
    if(type==1){
      message="账户或密码错误"
    }else if(type==2){
      message="验证码错误"
    }
    return { message };
  }

  /**
   * 获取验证码
   */
  @Get('login/code')
  async getCode(@Request() req, @Response() res) {
    const svgCaptcha = await this.toolsService.getCaptcha();
    req.session.code = svgCaptcha.text;
    console.log('当前验证码', req.session.code);
    res.type('image/svg+xml'); //这个返回的类型
    res.send(svgCaptcha.data);
  }

  /**
   *  登录动作 。同步动作。
   * res.render动态渲染错误页面。
   */
  @Post('login/doLogin')
  async doLogin(@Body() body, @Request() req, @Response() res, @Next() next) {
    const { username, password, code } = body;
    try {
      // 验证二维码  不验证二维码
      // if (code.toUpperCase() === req.session.code.toUpperCase()) {
        const user = await this.adminService.findUser({
          username,
          password: this.toolsService.getMd5(password),
        });

        if (user.length > 0) {
          req.session.userInfo = user[0];
          // 登录成功，重定向到后台管理首页
          res.redirect('/admin/main/index'); //重定向，绝对路径，不然会追加
        } else {
          res.redirect('/admin/login?type=1' );
        }
      // } else {
      //   res.render('admin/login.hbs', {
      //     message: '验证码错误',
      //   });
      // }
    } catch (error) {
      res.render('admin/login/login.hbs', {
        message: '验证码错误',
      });
    }
  }

  /**
   * 退出登录
   */
  @Get('loginOut')
  loginOut(@Request() req, @Response() res) {
    req.session.userinfo = null;
    res.redirect('/admin/login/login');
    // res.render('admin/login.hbs');
  }

  /**
   * 首页欢迎页
   */
  @Get('main/index')
  @Render('admin/main/index.hbs')
  main() {
    console.log('进入首页');
    return {};
  }

  /**
   * 首页欢迎页面
   */
  // @Get('main/welcome')
  // @Render('admin/main/welcome.hbs')
  // welcome() {
  //   console.log('');
  //   return {};
  // }

}

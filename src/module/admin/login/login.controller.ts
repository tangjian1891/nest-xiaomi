import { Controller, Get, Render, Request, Response } from '@nestjs/common';
import { ToolsService } from '../../../service/tools/tools.service';
@Controller('admin')
export class LoginController {
  constructor(private toolsService: ToolsService) {}
  @Get('login')
  @Render('admin/login.hbs')
  index() {
    console.log('进来了吗');
    return { name: '你好啊' };
  }

  @Get('code')
  async verify(@Request() req, @Response() res) {
    const svgCaptcha = await this.toolsService.getCaptcha();
    console.log(req.session)
    req.session.code = svgCaptcha.text;
    res.type('image/svg+xml');
    res.send(svgCaptcha.data);
  }
}

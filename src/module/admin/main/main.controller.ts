import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin/main')
export class MainController {
  @Get('index')
  @Render('admin/main/index')
  index() {
    console.log("看到了吗")
    return {};
  }

  @Get('welcome')
  @Render('admin/main/welcome')
  welcome() {
    console.log("进入首页了")
    return {};
  }
}

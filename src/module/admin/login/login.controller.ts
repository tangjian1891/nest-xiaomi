import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin/login')
export class LoginController {


  @Get()
  @Render('admin/login.hbs')
  index(){
      console.log("进来了吗")
    return {name:"你好啊"}
  }
}

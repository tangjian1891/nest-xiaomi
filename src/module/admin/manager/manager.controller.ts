import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin/manager')
export class ManagerController {


  @Get()
  @Render('admin/manager/index')
  index(){
    console.log("捕获管理页面");
    
      return { name:"你好啊"}
  }



  @Get('add')
  @Render('admin/manager/add')
  add(){
    console.log("捕获添加");
      return {}
  }


  @Get('edit')
  @Render('admin/manager/edit')
  edit(){
    console.log("捕获编辑");
      return {}
  }
}

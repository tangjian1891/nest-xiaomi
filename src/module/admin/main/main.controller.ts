import { Controller, Get } from '@nestjs/common';

@Controller('main')
export class MainController {
  @Get()
  index() {
    return '后台首页';
  }
}

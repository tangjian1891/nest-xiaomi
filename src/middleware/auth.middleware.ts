import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const url = req.baseUrl;
    console.log(`ur:${url}`)
    const userInfo = req.session.userInfo;
    if (userInfo && userInfo.username) {
      res.locals.userInfo=userInfo
      next();
    } else {
      // 否则手动加入数据，并放行
      req.session.userInfo={
        username:"admin",
        password:"123456"
      }
      next()
      // if (
      //   url === '/admin/login' ||
      //   url === '/admin/code' ||
      //   url === '/admin/login/doLogin'||
      //   url === '/admin/add'
      // ) {
      //   next();
      // }else{
      //   res.redirect('/admin/login')
      // }
    }
  }
}

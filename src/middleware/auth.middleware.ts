import { Injectable, NestMiddleware } from '@nestjs/common';
import { RSA_NO_PADDING } from 'constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const url = req.baseUrl;

    const userInfo = req.session.userInfo;
    if (userInfo && userInfo.username) {
      next();
    } else {
      if (
        url === '/admin/login' ||
        url === '/admin/code' ||
        url === '/admin/login/doLogin'
      ) {
        next();
      }else{
        res.redirect('admin/login')
      }
    }
  }
}

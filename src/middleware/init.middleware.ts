import { Injectable, NestMiddleware } from '@nestjs/common';
import { Helper } from 'src/extend/helper';

@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    res.locals.helper = Helper;
    next();
  }
}

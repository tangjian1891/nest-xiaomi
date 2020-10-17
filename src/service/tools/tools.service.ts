import { Injectable } from '@nestjs/common';
var svgCaptcha = require('svg-captcha');

import * as md5 from 'md5';

@Injectable()
export class ToolsService {
  // 生成验证码
  async getCaptcha() {
    var captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    });
    return captcha;
  }

  getMd5(str: String) {
    return md5(str);
  }

 async error(res, { redirectUrl, message }) {
  await  res.render(redirectUrl, { message });
  }
}

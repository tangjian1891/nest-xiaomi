import * as dayjs from 'dayjs';
export class Helper {
  static formatTime(timestamp) {
    return dayjs(Number(timestamp)).format('YYYY-MM-DD');
  }
 
}

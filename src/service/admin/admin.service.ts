import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schema/user.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(User.name) private readonly userModel) {}

  async findUser(user) {
    return await this.userModel.find(user);
  }

  async addData(userData) {
    console.log('进入了');
    const a = this.userModel;
    const user = new this.userModel(userData);
    // const foo=await this.adminModel.find()
    await user.save();
    // console.log(foo)
    return '';
  }
}

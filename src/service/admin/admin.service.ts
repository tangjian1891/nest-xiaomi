import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';



@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private readonly adminModel) {}

  async find(user) {
    return await this.adminModel.find();
  }

  async addData(userData) {
    console.log("进入了")
    const a=this.adminModel
    const user=new this.adminModel(userData)
    // const foo=await this.adminModel.find() 
    await user.save()
    // console.log(foo)
    return '';
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from 'src/interface/user.interface';
import {  User } from 'src/schema/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<any>) {}
  /**
   * 查询
   * @param json 数据集合
   * @param fields
   */
  async find(json: UserInterface = {}, fields?: string) {
    try {
      return await this.userModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }

  /**
   * 添加 
   */
  async add(json: UserInterface) {
    try {
      const role = new this.userModel(json);
      return await role.save();
    } catch (error) {
      return {};
    }
  }

  /**
   * 更新
   */
  async update(json1: UserInterface, json2: UserInterface) {
    try {
      return await this.userModel.updateOne(json1, json2);
    } catch (error) {
      return null;
    }
  }
  /**
   * 删除
   */
  async delete(json: UserInterface) {
    try {
      return await this.userModel.deleteOne(json);
    } catch (error) {
      return null;
    }
  }
  /**
   * mock增加数据
   */
  async save(json: UserInterface) {
    return await new this.userModel(json).save();
  }

  /**
   * mock增加数据
   */
  async addData() {
    return await new this.userModel({
      title: '销售部门',
      description: '销售部门啊啊啊啊',
    }).save();
  }

  /**
   * 获取实体类
   */
  getModel(){
    return this.userModel
  }
}

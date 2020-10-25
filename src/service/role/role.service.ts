import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleInterface } from 'src/interface/role.interface';
import { Role, RoleSchem } from 'src/schema/role.schema';
@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<any>) {}
  /**
   * 查询
   * @param json 数据集合
   * @param fields
   */
  async find(json: RoleInterface = {}, fields?: string) {
    try {
      return await this.roleModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }

  /**
   * 添加
   */
  async add(json: RoleInterface) {
    try {
      const role = new this.roleModel(json);
      return await role.save();
    } catch (error) {
      return {};
    }
  }

  /**
   * 更新
   */
  async update(json1: RoleInterface, json2: RoleInterface) {
    try {
      return await this.roleModel.updateOne(json1, json2);
    } catch (error) {
      return null;
    }
  }
  /**
   * 删除
   */
  async delete(json: RoleInterface) {
    try {
      return await this.roleModel.deleteOne(json);
    } catch (error) {
      return null;
    }
  }
  /**
   * mock增加数据
   */
  async save(json: RoleInterface) {
    return await new this.roleModel(json).save();
  }

  /**
   * mock增加数据
   */
  async addData() {
    return await new this.roleModel({
      title: '销售部门',
      description: '销售部门啊啊啊啊',
    }).save();
  }
}

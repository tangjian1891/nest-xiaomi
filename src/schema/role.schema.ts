import * as mongoose from 'mongoose';
const d = new Date();

export const RoleSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  status: { type: Number ,default:1},
  add_time: { type: String, default: d.getTime() },
});


export const Role={
  name:"role"
}

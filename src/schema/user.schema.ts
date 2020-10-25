import * as mongoose from 'mongoose';
const d = new Date();

const UserSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String },
  // mobile: { type: String  },
  // email: { type: String  },
  // status: { type: Number,default:1  },
  // add_time: {
  //   type:Number,
  //   default: d.getTime()
  // },
  // is_super: { type:Number}
});

const User = {
  name: 'user',
};
export { UserSchema, User };

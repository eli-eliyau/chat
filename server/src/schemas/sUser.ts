import mongoose, { Schema, connect } from "mongoose";
import jwt from "jsonwebtoken";
import { run } from "node:test";

// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  _fullName: string;
  _email: string;
  _password: string;
  _token: String;
  _room: Number;
  _connected:boolean
  _id_socket_io: String;
  _dade_created: {
    type: Date;
  };
}
let numRoom = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

// 2. Create a Schema corresponding to the document interface.
const userSchema: Schema = new Schema<IUser>({
  _fullName: { type: String, required: true },
  _email: { type: String, required: true },
  _password: { type: String, required: true },
  _token: { type: String },
  _room: { type: Number ,default:numRoom},
  _connected:{type:Boolean ,default:false},
  _id_socket_io: { type: String },
  _dade_created: {
    type: Date,
    default: Date.now(),
  },
});

const UsersSchema = mongoose.model<IUser>("users", userSchema);

export const genToken = (userId: Object | undefined) => {
  let token = jwt.sign({ _id: userId }, "ELI", { expiresIn: "1mins" });
  return token;
};

export default UsersSchema;

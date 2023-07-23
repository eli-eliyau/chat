import mongoose, { Schema, connect } from "mongoose";
import jwt from "jsonwebtoken";

// 1. Create an interface representing a document in MongoDB.
export interface IMessages {
  _id_from_user: string;
  _id_to_user: string;
  _message: string;
  _dade_created: {
    type: Date;
  };
}

// 2. Create a Schema corresponding to the document interface.
const messagesSchema: Schema = new Schema<IMessages>({
  _id_from_user: { type: String, required: true },
  _id_to_user: { type: String, required: true },
  _message: { type: String, required: true },
  _dade_created: {
    type: Date,
    default: Date.now(),
  },
});

const MessagesSchema = mongoose.model<IMessages>("messages", messagesSchema);

export const genToken = (userId: Object | undefined) => {
  let token = jwt.sign({ _id: userId }, "ELI", { expiresIn: "1mins" });
  return token;
};

export default MessagesSchema;

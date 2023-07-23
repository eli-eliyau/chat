import { Request, Response } from "express";
import UsersSchema from "../schemas/sUser";

const userExist = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const dataUser = await UsersSchema.findOne({
      _email: req.body._email,
      _password: req.body._password,
    });

    dataUser ? res.send(dataUser) : res.send(false);
    console.log(dataUser);
  } catch (err) {
    console.log(err);
  }
};

const insertUser = async (req: Request, res: Response) => {
  try {
    const dataUser = await new UsersSchema(req.body);
    dataUser.save();
    dataUser ? res.send(dataUser) : res.send(false);
  } catch (err) {
    console.log(err);
  }
};

export { userExist, insertUser };

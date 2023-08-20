import UsersSchema from "../schemas/sUser";
import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await UsersSchema.find(
      { _id: { $ne: req.body._id } },
      { __v: 0, dade_created: 0, _password: 0 }
    );

    allUsers ? res.send(allUsers) : res.send(false);
  } catch (err) {
    console.log(err);
  }
};

export { getAllUsers };

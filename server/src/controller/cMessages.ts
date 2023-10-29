import MessagesSchema from "../schemas/sMessages";
import { Request, Response } from "express";

const setMessage = async (req: Request, res: Response) => {
  try {

    const data = await new MessagesSchema(req.body);
    await data.save();

    data ? res.send(data) : res.send(false);
  } catch (error) {
    console.log(error);
  }
};

export { setMessage };

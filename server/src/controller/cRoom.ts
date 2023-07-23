import { Request, Response } from "express";
import UsersSchema from "../schemas/sUser";
import socketIo from "../socket.io";
import { io } from "../app";

const updateNumRoom = async (req: Request, res: Response) => {
  let usersToUpdate = req.body;

  try {
    const user1 = await UsersSchema.findOne({ _id: req.body[0]._id }).select(
      "_room"
    );
    const user2 = await UsersSchema.findOne({ _id: req.body[1]._id }).select(
      "_room"
    );
    let numRoom = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

    user1?._room != user2?._room &&
      usersToUpdate.map(async (_id: string) => {
        return await UsersSchema.updateOne({ _id: _id }, { _room: numRoom });
      });

    const room = await UsersSchema.findOne({
      _id: req.body[1]._id,
    }).select("_room");
    console.log(55);

    room ? res.json(room._room) : res.send(false);
  } catch (error) {
    console.log(error);
  }
};

export { updateNumRoom };

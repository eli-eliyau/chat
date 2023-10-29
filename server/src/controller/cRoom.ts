import { Request, Response } from "express";
import UsersSchema from "../schemas/sUser";

const updateNumRoom = async (req: Request, res: Response) => {
  let usersToUpdate = req.body;

  try {
    const user1 = await UsersSchema.findOne({ _id: req.body[0]._id }).select("_room");
    const user2 = await UsersSchema.findOne({ _id: req.body[1]._id }).select("_room");
    let numRoom = Math.floor(Math.random() * (100 - 1 + 1)) + 1;

    if (user1?._room !== user2?._room) {
      await Promise.all(usersToUpdate.map((_id: string) => {
        return UsersSchema.findOneAndUpdate({ _id: _id }, { _room: numRoom }, { new: true });
      }));
    }

    const room = await UsersSchema.findOne({ _id: req.body[1]._id }).select("_room");

    room ? res.send(`${room._room}`) : res.status(404).send('Room not found');
  } catch (error) {
    res.status(500).send(error);
  }
};

export { updateNumRoom };

import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import UsersSchema from "../schemas/sUser";
import fs from 'fs'
import path from 'path'
const onlineUsers = new Map();

const connectedUsers = new Map();
const message = new Map();

const socketIo = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.on("connection", (socket) => {
    console.log("eli", `${socket.id}`);


    socket.on('userConnected', async (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(connectedUsers);
      const updatedUser = await UsersSchema.findByIdAndUpdate(userId, { $set: { _connected: true } },)

      if (!updatedUser) {
        console.log('User not found.');
        return;
      }
      console.log('Updated User:', updatedUser);
    });

    const userId = socket.id;
    onlineUsers.set("id", userId);


    socket.on("send_message", (data) => {
      message.set(userId, data);
      socket.broadcast.emit("receive_message", data);
    });


    socket.on("join_room", (data) => {
      console.log("join room num", data);
      socket.join(data);
    });


    socket.on("send_messageAndRoom", (data) => {
      socket.to(data.numRoom).emit("receive_room", data);
    });


    socket.on('disconnect', async () => {
      for (const [userId, id] of connectedUsers.entries()) {
        if (id === socket.id) {
          connectedUsers.delete(userId);
          const updatedUser = await UsersSchema.findByIdAndUpdate(userId, { $set: { _connected: false } },)
          if (!updatedUser) {
            console.log('User not found.');
            return;
          }
          console.log(connectedUsers);
          break;
        }
      }
    });
  });
};

export default socketIo;

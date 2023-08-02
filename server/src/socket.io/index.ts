import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const onlineUsers = new Map();

const ids = new Map();
const connectedUsers = new Map();
const message = new Map();

const socketIo = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.on("connection", (socket) => {
    console.log("eli", `${socket.id}`);

    socket.on('userConnected', (userId) => {
      connectedUsers.set(userId, socket.id);
      console.log(connectedUsers);
      
      io.emit('userStatusUpdate', userId, true); // Notify all users about the status change
   
    });
    const userId = socket.id;

    ids.set("id", userId);
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

    // socket.on("disconnect", () => {
    //   // console.log(userId);

    //   // Remove the user's connection information
    //   onlineUsers.delete(userId);
    // });

    socket.on('disconnect', () => {
      for (const [userId, id] of connectedUsers.entries()) {
        if (id === socket.id) {
          connectedUsers.delete(userId);
          console.log(connectedUsers);
          
          io.emit('userStatusUpdate', userId, false); // Notify all users about the status change
          break;
        }
      }
    });
  });
};

export default socketIo;

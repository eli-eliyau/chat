import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectingDB from "./db/connecing";
import router from "./routers/routers";
import socketIo from "./socket.io";


const URL_CLIENT ="http://localhost:3000"
const PORT = 3005

connectingDB
const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: `${URL_CLIENT}`,
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: `${URL_CLIENT}`, credentials: true }));

app.use(express.json());

app.use("/api", router);

socketIo(io);

server.listen(PORT, () => {
  console.log(`server is run port ${PORT}`);
});

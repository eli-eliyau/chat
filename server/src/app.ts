import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectingDB from "./db/connecing";
import router from "./routers/routers";
import socketIo from "./socket.io";
import path  from 'path'
connectingDB;

const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

socketIo(io);

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

app.use("/api", router);

server.listen(3001, () => {
  console.log("server is run port 3001");
});

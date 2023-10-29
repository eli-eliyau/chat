import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import router from "./routers/routers";
import socketIo from "./socket.io";
import './db/connecing'
require("dotenv").config({ path: "./.env" });


const PORT = 4000
const app = express();

const server = http.createServer(app);


export const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: process.env.FRONT_URL, credentials: true }));

app.use(express.json());

app.use("/api", router);

 socketIo(io);



server.listen(PORT, () => {
  console.log(`server is run port ${PORT}`);
});

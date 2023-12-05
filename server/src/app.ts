import express ,{ Request, Response }from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import router from "./routers/routers";
import socketIo from "./socket.io";
import './db/connecing'
import path from "node:path";
require("dotenv").config({ path: "./.env" });


const PORT = 4000

const app = express();

const server = http.createServer(app);
const buildClient = path.join(__dirname, '../../client/build/index.html')

export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use(express.json());

app.use("/api", router);

 socketIo(io);

 app.use(express.static(path.join(__dirname, "../../client/build")));

// app.get("*", (req: Request, res: Response) => {
// res.sendFile(path.join(__dirname, "../../client/build/index.html"));
// });




server.listen(PORT, () => {
  console.log(`server is run port ${PORT}`);
});

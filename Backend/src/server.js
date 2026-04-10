import dotenv from "dotenv";
dotenv.config();

import http from  "http";
import app from "./app.js";
import { mongoDbConnect } from "./configs/db.js";
import { initSocket } from "./sockets/socket.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initSocket(server);

server.listen(PORT, () => {
  mongoDbConnect();
  console.log(`server is listening on port ${PORT}`);
});

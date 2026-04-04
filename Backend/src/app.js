import express from 'express';
import cors from 'cors';
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api", messageRoutes);

export default app;

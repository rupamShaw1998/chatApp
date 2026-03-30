import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { mongoDbConnect } from "./configs/db.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  mongoDbConnect();
  console.log(`server is listening on port ${PORT}`);
});

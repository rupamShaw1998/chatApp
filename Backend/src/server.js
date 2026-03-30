import dotenv from "dotenv";
import app from "./app.js";
import { mongoDbConnect } from "./configs/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  mongoDbConnect();
  console.log(`server is listening on port ${PORT}`);
});

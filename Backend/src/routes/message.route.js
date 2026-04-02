import express from "express";
import { getMessages, markAsSeen, sendMessage } from "../controllers/message.controller";
import { authTokenVerification } from "../middleware/auth";

const router = express.Router();

router.post("/send", authTokenVerification, sendMessage);
router.get("/:userId", authTokenVerification, getMessages);
router.put("/seen/:senderId", authTokenVerification, markAsSeen);

export default router;

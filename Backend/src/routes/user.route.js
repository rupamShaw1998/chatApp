import express from "express";
import { getUsers, signIn, signUp } from "../controllers/user.controller.js";
import { authTokenVerification } from "../middleware/auth.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.get("/users", authTokenVerification, getUsers);

export default router;

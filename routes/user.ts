import express from "express";
import { createUser } from "../controllers/user";
const router = express.Router();

router.post("/create_user", createUser);

export default router;

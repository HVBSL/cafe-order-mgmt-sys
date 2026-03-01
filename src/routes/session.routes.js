import express from "express";
import { createSession, getSessions, updateSession } from "../controllers/session.controller.js";

const router = express.Router();

router.post("/create", createSession);
router.get("/get", getSessions);
router.put("/update", updateSession);

export default router;
import express from "express";
import { createTable, getTables, updateTable } from "../controllers/table.controller.js";

const router = express.Router();

router.post("/create", createTable);
router.get("/get", getTables);
router.put("/update", updateTable);

export default router;

import express from "express";
import { createItems, getItems, updateItems, 
    updateItemAvailability, deleteItems } from "../controllers/menu.controller.js";


const router = express.Router();

router.post("/create", createItems);
router.get("/get", getItems);
router.put("/update", updateItems);
router.put("/update-availability", updateItemAvailability);
router.delete("/delete", deleteItems);

export default router;
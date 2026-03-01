import express from "express";
import { createCompany, getCompanies, updateCompany } from "../controllers/companyDet.controller.js";

const router = express.Router();

router.post("/create", createCompany);
router.get("/get", getCompanies);
router.put("/update", updateCompany);

export default router;

import Table from "../models/table.model.js";
import CompanyDet from "../models/companyDet.model.js";

export const createTable = async (req, res) => {
    try {
        const { tableNumber, capacity } = req.body; // companyId 

        // const company = await CompanyDet.findById(companyId);
        // if (!company) {
        //     return res.status(404).json({ message: "Company not found" });
        // }

        const existingTable = await Table.findOne({ tableNumber, companyId });
        if (existingTable) {
            return res.status(400).json({ message: "Table with this number already exists for this company" });
        }

        const table = await Table.create({
            tableNumber,
            capacity,
            status: true,
        });

        res.status(201).json({ message: "Table created successfully", table });
    } catch (error) {
        res.status(500).json({ message: "Error creating table", error: error.message });
    }
};

export const getTables = async (req, res) => {
    try {
        const { tableId, status } = req.body;

        const company = await CompanyDet.findAll({status: true});
         if (!company || company.length === 0) {
            return res.status(404).json({ message: "Company not found" });
        }

        const tables = await Table.find({
            companyId,
            ...(tableId && { _id: tableId }),
            ...(typeof status === "boolean" ? { status } : {}),
        });

        res.status(200).json({ tables });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving tables", error: error.message });
    }
};

export const updateTable = async (req, res) => {
    try {
        const { tableId, tableNumber, capacity, status } = req.body;

        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: "Table not found" });
        }

        if (typeof tableNumber === "number") table.tableNumber = tableNumber;
        if (typeof capacity === "number") table.capacity = capacity;
        if (typeof status === "boolean") table.status = status;

        await table.save();

        res.status(200).json({ message: "Table updated successfully", table });
    } catch (error) {
        res.status(500).json({ message: "Error updating table", error: error.message });
    }
};

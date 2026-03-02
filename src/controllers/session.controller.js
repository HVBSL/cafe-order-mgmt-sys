import Table from "../models/table.model.js";
import Session from "../models/session.model.js";
import CompanyDet from "../models/companyDet.model.js";

export const createSession = async (req, res) => {
    try {
        const { tableId, custName, phoneNo } = req.body;

        // Check if the table exists and is active
        const table = await Table.findOne({ tableNumber: tableId, status: true });

        if (!table) {
            return res.status(404).json({ message: "Table not found or is not active" });
        }

        // Create a new session
        const session = await Session.create({
            tableId: table._id,
            custName,
            phoneNo,
            active: true,
        });

        res.status(201).json({ message: "Session created successfully", session });

    } catch (error) {
        res.status(500).json({ message: "Error creating session", error: error.message });
    }
}

export const getSessions = async (req, res) => {
    try {
        const { tableId, phoneNo } = req.body;

        // Check if the company exists
        // const company = await CompanyDet.findOne({ _id: companyId });

        // if (!company) {
        //     return res.status(404).json({ message: "Company not found" });
        // }

        // Find sessions based on the provided parameters
        const sessions = await Session.find({
            ...(tableId && { tableId }),
            ...(phoneNo && { phoneNo }),
            active: true,
        });

        res.status(200).json({ sessions });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving sessions", error: error.message });
    }
}

export const updateSession = async (req, res) => {
    try {
        const { active, sessionId } = req.body;

        // Find the session by ID
        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Update the session's active status
        session.active = active;
        await session.save();

        res.status(200).json({ message: "Session updated successfully", session });

    } catch (error) {
        res.status(500).json({ message: "Error updating session", error: error.message });
    }
}
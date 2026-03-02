import Order from "../models/order.model.js";
import Session from "../models/session.model.js";
import CompanyDet from "../models/companyDet.model.js";
import Table from "../models/table.model.js";
import Menu from "../models/menu.model.js";

export const placeOrder = async (req, res) => {
    try {
        const { sessionId, tableId, companyId, items } = req.body;

        // Validate required fields
        if (!sessionId || !tableId || !companyId) {
            return res.status(400).json({ message: "sessionId, tableId, and companyId are required" });
        }

        // Validate menu items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items array is required and must not be empty" });
        }

        // Check if the session exists and is active
        const session = await Session.findOne({ _id: sessionId, active: true });

        if (!session) {
            return res.status(404).json({ message: "Session not found or is not active" });
        }

        // Check if the table exists and is active
        const table = await Table.findOne({ _id: tableId, companyId, status: true });

        if (!table) {
            return res.status(404).json({ message: "Table not found or is not active" });
        }

        // Check if the company exists
        // const company = await CompanyDet.findOne({ _id: companyId });

        // if (!company) {
        //     return res.status(404).json({ message: "Company not found" });
        // } 

        // Validate menu items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Items array is required and must not be empty" });
        }

        for (const item of items) {
            const menuItem = await Menu.findOne({ _id: item.menuId, companyId, isActive: true });

            if (!menuItem) {
                return res.status(404).json({ message: `Menu item with ID ${item.menuId} not found or is not active` });
            }
        }

        // Create a new order
        const order = await Order.create({
            sessionId,
            tableId,
            items,
        });

        res.status(201).json({ message: "Order placed successfully", order });

    } catch (error) {
        res.status(500).json({ message: "Error placing order", error: error.message });
    }
}

export const getOrders = async (req, res) => {
    try {
        const { companyId } = req.body;

        const orders = await Order.find({ companyId, status: { $ne: "cancelled" } }).populate("sessionId").populate("tableId").populate("items.menuId");

        res.status(200).json({ orders });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving orders", error: error.message });
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Check if the order exists
        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Update the order status
        order.status = status;
        await order.save();

        res.status(200).json({ message: "Order status updated successfully", order });

    } catch (error) {
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
}
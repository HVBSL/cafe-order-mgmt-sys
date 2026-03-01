import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        required: true,
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required: true,
    },
    status: {
        type: String,
        enum: ["PLACED", "ACCEPTED", "PREPARING", "READY", "DELIVERED", "CANCELLED"],
        default: "PLACED",
    },
    items: [
        {
            menuId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Menu",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    statusUpdatedReason: {
        type: String,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema); 

export default Order;
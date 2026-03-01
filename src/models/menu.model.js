import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    companyId: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: true });

const Menu = mongoose.model("Menu", menuSchema); 

export default Menu;
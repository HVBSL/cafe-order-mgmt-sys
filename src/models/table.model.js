import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    // companyId: {
    //     type: String,
    //     required: true,
    // },
    status: {
        type: Boolean,
        required: true,
        default: true,
    },
}, { timestamps: true });

const Table = mongoose.model("Table", tableSchema);

export default Table;
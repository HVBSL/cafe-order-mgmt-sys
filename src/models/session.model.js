import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required: true,
    }, 
    custName: {
        type: String,
        required: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    // companyId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    active: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);

export default Session;
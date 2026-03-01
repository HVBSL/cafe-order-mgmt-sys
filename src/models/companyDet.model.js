import mongoose from "mongoose";

const companyDetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const CompanyDet = mongoose.model("CompanyDet", companyDetSchema);

export default CompanyDet;
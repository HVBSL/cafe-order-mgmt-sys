import CompanyDet from "../models/companyDet.model.js";

export const createCompany = async (req, res) => {
    try {
        const { name, email, phoneNo, address } = req.body;

        const existingCompany = await CompanyDet.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ message: "Company with this email already exists" });
        }

        const company = await CompanyDet.create({
            name,
            email,
            phoneNo,
            address,
        });

        res.status(201).json({ message: "Company created successfully", company });
    } catch (error) {
        res.status(500).json({ message: "Error creating company", error: error.message });
    }
};

export const getCompanies = async (req, res) => {
    try {
        const { companyId, email } = req.body;

        let companies;
        if (companyId) {
            const company = await CompanyDet.findById(companyId);
            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }
            companies = [company];
        } else if (email) {
            const company = await CompanyDet.findOne({ email });
            if (!company) {
                return res.status(404).json({ message: "Company not found" });
            }
            companies = [company];
        } else {
            companies = await CompanyDet.find({});
        }

        res.status(200).json({ companies });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving companies", error: error.message });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { companyId, name, email, phoneNo, address } = req.body;

        const company = await CompanyDet.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        if (name) company.name = name;
        if (email) company.email = email;
        if (phoneNo) company.phoneNo = phoneNo;
        if (address) company.address = address;

        await company.save();

        res.status(200).json({ message: "Company updated successfully", company });
    } catch (error) {
        res.status(500).json({ message: "Error updating company", error: error.message });
    }
};

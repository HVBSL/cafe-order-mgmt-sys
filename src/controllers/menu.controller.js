import CompanyDet from "../models/companyDet.model.js";
import Menu from "../models/menu.model.js";

export const getItems = async (req, res) => {
    try {
        // const { companyId } = req.body;

        // // Check if the company exists
        // const company = await CompanyDet.findOne({ _id: companyId });

        // if (!company) {
        //     return res.status(404).json({ message: "Company not found" });
        // }

        // Find the menu for the specified company
        const menu = await Menu.findAll({ isActive: true });

        if (!menu || menu.length === 0) {
            return res.status(404).json({ message: "Menu not found for this company" });
        }

        res.status(200).json({ menu });

    } catch (error) {
        res.status(500).json({ message: "Error retrieving menu", error: error.message });
    }
}

export const createItems = async (req, res) => {
    try {
        const { companyId, name, price, category } = req.body;

        // Check if the company exists
        const company = await CompanyDet.findOne({ _id: companyId });

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        const existingMenu = await Menu.findOne({ companyId, name });

        if (existingMenu && existingMenu?.isActive) {
            return res.status(400).json({ message: "Menu item with this name already exists for this company" });
        }
        else if (existingMenu && !existingMenu?.isActive) {
            existingMenu.isActive = true;
            existingMenu.price = price;
            existingMenu.category = category;
            await existingMenu.save();
            return res.status(200).json({ message: "Menu item reactivated successfully", menu: existingMenu });
        }

        // Create a new menu for the specified company
        const menu = await Menu.create({
            companyId,
            name,
            price,
            category,
        });

        res.status(201).json({ message: "Menu created successfully", menu });

    } catch (error) {
        res.status(500).json({ message: "Error creating menu", error: error.message });
    }
}

export const updateItems = async (req, res) => {
    try {
        const { menuId, name, price, category, isAvailable } = req.body;

        // Check if the menu exists
        const menu = await Menu.findOne({ _id: menuId, isActive: true, isAvailable: true });

        if (!menu) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Update the menu item
        menu.name = name;
        menu.price = price;
        menu.category = category;

        await menu.save();

        res.status(200).json({ message: "Menu item updated successfully", menu });

    } catch (error) {
        res.status(500).json({ message: "Error updating menu item", error: error.message });
    }
}

export const updateItemAvailability = async (req, res) => {
    try {
        const { menuId } = req.body;

        // Check if the menu exists
        const menu = await Menu.findOne({ _id: menuId, isActive: true });

        if (!menu) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Update the availability of the menu item
        menu.isAvailable = !menu.isAvailable;
        await menu.save();

        res.status(200).json({ message: "Menu item availability updated successfully", menu });

    } catch (error) {
        res.status(500).json({ message: "Error updating menu item availability", error: error.message });
    }
}

export const deleteItems = async (req, res) => {
    try {
        const { menuId } = req.body;

        // Check if the menu exists
        const menu = await Menu.findOne({ _id: menuId, isActive: true });

        if (!menu) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        // Soft delete the menu item by setting isActive to false
        menu.isActive = false;
        await menu.save();

        res.status(200).json({ message: "Menu item deleted successfully", menu });

    } catch (error) {
        res.status(500).json({ message: "Error deleting menu item", error: error.message });
    }
}
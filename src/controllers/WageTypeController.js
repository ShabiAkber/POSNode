const wageTypeService = require("../services/WageTypeService");

class WageTypeController {
    async getAll(req, res) {
        try {
            const wageTypes = await wageTypeService.getAll();
            res.status(200).json(wageTypes);
        } catch (error) {
            next(error); // Pass the error to errorMiddleware
        }
    }

    async getById(req, res) {
        try {
            const wageType = await wageTypeService.getById(req.params.id);
            if (!wageType) return res.status(404).json({ message: "Wage Type not found" });
            res.status(200).json(wageType);
        } catch (error) {
            next(error); // Pass the error to errorMiddleware
        }
    }

    async create(req, res) {
        try {
            const newWageType = await wageTypeService.create(req.body);
            res.status(201).json(newWageType);
        } catch (error) {
            next(error); // Pass the error to errorMiddleware
        }
    }

    async update(req, res) {
        try {
            const updatedWageType = await wageTypeService.update(req.params.id, req.body);
            res.status(200).json(updatedWageType);
        } catch (error) {
            next(error); // Pass the error to errorMiddleware
        }
    }

    async delete(req, res) {
        try {
            await wageTypeService.delete(req.params.id);
            res.status(200).json({ message: "Wage Type deleted successfully" });
        } catch (error) {
            next(error); // Pass the error to errorMiddleware
        }
    }
}

module.exports = new WageTypeController();

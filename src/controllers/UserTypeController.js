const userTypeService = require("../services/UserTypeService");

class UserTypeController {
    async getAll(req, res) {
        try {
            const userTypes = await userTypeService.getAll();
            res.status(200).json(userTypes);
        } catch (error) {
            next(error); // Pass the error to errorMiddleware
        }
    }

    async getById(req, res) {
        try {
            const userType = await userTypeService.getById(req.params.id);
            if (!userType) return res.status(404).json({ message: "User Type not found" });
            res.status(200).json(userType);
        } catch (error) {
            next(error); // Pass the error to errorMiddleware
        }
    }

    async create(req, res) {
        try {
            const newUserType = await userTypeService.create(req.body);
            res.status(201).json(newUserType);
        } catch (error) {
            next(error); // Pass the error to errorMiddleware
        }
    }

    async update(req, res) {
        try {
            const updatedUserType = await userTypeService.update(req.params.id, req.body);
            res.status(200).json(updatedUserType);
        } catch (error) {
            next(error); // Pass the error to errorMiddleware
        }
    }

    async delete(req, res) {
        try {
            await userTypeService.delete(req.params.id);
            res.status(200).json({ message: "User Type deleted successfully" });
        } catch (error) {
            next(error); // Pass the error to errorMiddleware
        }
    }
}

module.exports = new UserTypeController();

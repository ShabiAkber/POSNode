const departmentService = require("../services/DepartmentService");

class DepartmentController {
  async getAll(req, res) {
    try {
      const departments = await departmentService.getAll();
      res.status(200).json(departments);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const department = await departmentService.getById(req.params.id);
      if (!department) return res.status(404).json({ message: "Department not found" });
      res.status(200).json(department);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const newDepartment = await departmentService.create(req.body);
      res.status(201).json(newDepartment);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const updatedDepartment = await departmentService.update(req.params.id, req.body);
      res.status(200).json(updatedDepartment);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      await departmentService.delete(req.params.id);
      res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new DepartmentController();

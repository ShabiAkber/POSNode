const userService = require("../services/UserService");

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll(req.query); 
      res.json(users);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res, next) {
    try {
      const user = await userService.getById(req.params.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res, next) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res, next) {
    try {
      const user = await userService.update(req.params.id, req.body);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res, next) {
    try {
      const deleted = await userService.delete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new UserController();

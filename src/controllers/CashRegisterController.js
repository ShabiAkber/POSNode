const cashRegisterService = require("../services/CashRegisterService");

class CashRegisterController {
  async getAll(req, res) {
    try {
      const cashRegisters = await cashRegisterService.getAll(req.query);
      res.json(cashRegisters);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const cashRegister = await cashRegisterService.getById(id);
      if (!cashRegister) return res.status(404).json({ message: "Cash Register not found" });
      res.json(cashRegister);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const newCashRegister = await cashRegisterService.create(req.body);
      res.status(201).json(newCashRegister);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedCashRegister = await cashRegisterService.update(id, req.body);
      if (!updatedCashRegister) return res.status(404).json({ message: "Cash Register not found" });
      res.json(updatedCashRegister);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedCashRegister = await cashRegisterService.delete(id);
      if (!deletedCashRegister) return res.status(404).json({ message: "Cash Register not found" });
      res.json({ message: "Cash Register deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new CashRegisterController();

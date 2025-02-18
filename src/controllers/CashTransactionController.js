const cashTransactionService = require("../services/CashTransactionService");

class CashTransactionController {
  async getAll(req, res) {
    try {
      const transactions = await cashTransactionService.getAll(req.query);
      res.json(transactions);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const transaction = await cashTransactionService.getById(id);
      if (!transaction) return res.status(404).json({ message: "Cash Transaction not found" });
      res.json(transaction);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async create(req, res) {
    try {
      const newTransaction = await cashTransactionService.create(req.body);
      res.status(201).json(newTransaction);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedTransaction = await cashTransactionService.update(id, req.body);
      if (!updatedTransaction) return res.status(404).json({ message: "Cash Transaction not found" });
      res.json(updatedTransaction);
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deletedTransaction = await cashTransactionService.delete(id);
      if (!deletedTransaction) return res.status(404).json({ message: "Cash Transaction not found" });
      res.json({ message: "Cash Transaction deleted successfully" });
    } catch (error) {
      next(error); // Pass the error to errorMiddleware
    }
  }
}

module.exports = new CashTransactionController();

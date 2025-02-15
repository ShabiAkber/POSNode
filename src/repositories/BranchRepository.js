const IRepository = require("./IRepository");
const { Branch } = require("../models/Branches");

class BranchRepository extends IRepository {
  async getAll() {
    return await Branch.findAll();
  }

  async getById(id) {
    return await Branch.findByPk(id);
  }

  async create(data) {
    return await Branch.create(data);
  }

  async update(id, data) {
    const branch = await Branch.findByPk(id);
    if (!branch) throw new Error("Branch not found");
    return await branch.update(data);
  }

  async delete(id) {
    const branch = await Branch.findByPk(id);
    if (!branch) throw new Error("Branch not found");
    await branch.destroy();
    return { message: "Branch deleted successfully" };
  }
}

module.exports = new BranchRepository();

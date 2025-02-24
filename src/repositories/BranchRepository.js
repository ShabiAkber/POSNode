const IRepository = require("./IRepository");
const Branch = require("../models/Branches");
const PKGenerator = require("../utils/pkGenerator");

class BranchRepository extends IRepository {
  constructor() {
    super(Branch);
  }

  async getAll() {
    return await Branch.findAll({
      where: {
        IsActive: true // Only get non-deleted branches
      },
      include: ["Restaurants"]
    });
  }

  async getById(id) {
    return await Branch.findByPk(id, {
      include: ["Restaurants"]
    });
  }

  async create(data) {
    try {
      // Generate PK before creating record
      const pk = await PKGenerator.generatePK('Branches', 'Branch_PK');
      return await Branch.create({
        ...data,
        Branch_PK: pk
      });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    const branch = await Branch.findByPk(id);
    if (!branch) throw new Error("Branch not found");
    return await branch.update(data);
  }

  async delete(id) {
    const branch = await Branch.findByPk(id);
    if (!branch) throw new Error("Branch not found");
    return await branch.update({ IsDeleted: true });
  }
}

module.exports = new BranchRepository();

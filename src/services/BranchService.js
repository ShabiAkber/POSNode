const IService = require("./IService");
const BranchRepository = require("../repositories/BranchRepository");

class BranchService extends IService {
  constructor() {
    super(BranchRepository);
  }

  async getAll() {
    return await BranchRepository.getAll();
  }

  async getById(id) {
    return await BranchRepository.getById(id);
  }

  async create(data) {
    return await BranchRepository.create(data);
  }

  async update(id, data) {
    return await BranchRepository.update(id, data);
  }

  async delete(id) {
    return await BranchRepository.delete(id);
  }
}

module.exports = new BranchService();

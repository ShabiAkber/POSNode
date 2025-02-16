const IService = require("./IService");
const tableDineInRepository = require("../repositories/TableDineInRepository");

class TableDineInService extends IService {
  async getAll() {
    return await tableDineInRepository.findAll();
  }

  async getById(id) {
    return await tableDineInRepository.findById(id);
  }

  async create(data) {
    return await tableDineInRepository.create(data);
  }

  async update(id, data) {
    return await tableDineInRepository.update(id, data);
  }

  async delete(id) {
    return await tableDineInRepository.delete(id);
  }
}

module.exports = new TableDineInService();

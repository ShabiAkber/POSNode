const IRepository = require("./IRepository");
const TableDineIn = require("../models/TableDineIns");

class TableDineInRepository extends IRepository {
    async getAll() {
      return await TableDineIn.findAll();
    }
  
    async getById(id) {
      return await TableDineIn.findByPk(id);
    }
  
    async create(data) {
      return await TableDineIn.create(data);
    }
  
    async update(id, data) {
      const tableDineIn = await TableDineIn.findByPk(id);
      if (!tableDineIn) return null;
      return await tableDineIn.update(data);
    }
  
    async delete(id) {
      const tableDineIn = await TableDineIn.findByPk(id);
      if (!tableDineIn) return null;
      return await tableDineIn.destroy();
    }
  }
  
  module.exports = new TableDineInRepository();
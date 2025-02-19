const IRepository = require("./IRepository");
const TableDineIn = require("../models/TableDineIns");

class TableDineInRepository extends IRepository {
  constructor() {
    super(TableDineIn);
  }

  async getAll(query) {
    return await TableDineIn.findAll({ where: { Table_BranchFK: query.BranchId, IsDeleted: false } });
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
    return await tableDineIn.update({ IsDeleted: true });
  }
}

  module.exports = new TableDineInRepository();
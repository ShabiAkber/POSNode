const IRepository = require("./IRepository");
const TableDineIn = require("../models/TableDineIns");

class TableDineInRepository extends IRepository {
  constructor() {
    super(TableDineIn);
  }

  async getAll(query) {
    return await TableDineIn.findAll({ where: { Table_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
  }
  
    async getById(id) {
      return await TableDineIn.findByPk(id, { include: ["Branch"] });
    }
  
    async create(data) {
      return await TableDineIn.create(data);
    }
  
    async update(id, data) {
      return await TableDineIn.update(data, { where: { Table_PK: id } });
    }
  
  async delete(id) {
    return await TableDineIn.update({ IsDeleted: true }, { where: { Table_PK: id } });
  }
}

  module.exports = new TableDineInRepository();
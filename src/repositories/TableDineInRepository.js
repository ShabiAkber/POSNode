const IRepository = require("./IRepository");
const TableDineIn = require("../models/TableDineIns");

class TableDineInRepository extends IRepository {
  constructor() {
    super(TableDineIn);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await TableDineIn.findAll({ where: { Table_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await TableDineIn.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }
  
    async getById(id) {
      return await TableDineIn.findByPk(id, { include: ["Branches"] });
    }
  
    async create(data) {
      try{
        const pk = await PKGenerator.generatePK('TableDineIns', 'Table_PK');
        return await TableDineIn.create({
          ...data,
          Table_PK: pk
        });
      } catch (error) {
        throw error;
      }
    }
    
    async update(id, data) {
      return await TableDineIn.update(data, { where: { Table_PK: id } });
    }
  
  async delete(id) {
    return await TableDineIn.update({ IsDeleted: true }, { where: { Table_PK: id } });
  }
}

  module.exports = new TableDineInRepository();
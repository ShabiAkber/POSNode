const IRepository = require("./IRepository");
const GenModifire = require("../models/GenModifires");

class GenModifireRepository extends IRepository {
  constructor() {
    super(GenModifire);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await GenModifire.findAll({ where: { GenMod_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branch"] });
    }
    return await GenModifire.findAll({ where: { IsDeleted: false }, include: ["Branch"] });
  }

  async getById(id) {
    return await GenModifire.findOne({ where: { GenMod_PK: id, IsDeleted: false }, include: ["Branch"] });
  }

  async create(data) {
    return await GenModifire.create(data);
  }

  async update(id, data) {
    return await GenModifire.update(data, { where: { GenMod_PK: id } });
  }

  async delete(id) {
    return await GenModifire.update({ IsDeleted: true }, { where: { GenMod_PK: id } });
  }
}

module.exports = new GenModifireRepository();

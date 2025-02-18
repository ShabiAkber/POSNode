const IRepository = require("./IRepository");
const GenModifire = require("../models/GenModifires");

class GenModifireRepository extends IRepository {
  constructor() {
    super(GenModifire);
  }

  async getAll(query) {
    return await GenModifire.findAll({ where: { GenMod_BranchFK: query.BranchId, IsDeleted: false } });
  }

  async getById(id) {
    return await GenModifire.findOne({ where: { GenMod_PK: id, IsDeleted: false } });
  }

  async create(data) {
    return await GenModifire.create(data);
  }

  async update(id, data) {
    const genModifire = await GenModifire.findByPk(id);
    if (!genModifire) return null;
    return await genModifire.update(data);
  }

  async delete(id) {
    const genModifire = await GenModifire.findByPk(id);
    if (!genModifire) return null;
    return await genModifire.update({ IsDeleted: true });
  }
}

module.exports = new GenModifireRepository();

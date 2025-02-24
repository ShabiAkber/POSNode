const IRepository = require("./IRepository");
const { MenuVersion } = require("../models");
const PKGenerator = require("../utils/pkGenerator");

class MenuVersionRepository extends IRepository {
  constructor() {
    super(MenuVersion);
  }

  async getAll(query) {
    if (query.BranchId) {
      return await MenuVersion.findAll({ where: { MenuVer_BranchFK: query.BranchId, IsDeleted: false }, include: ["Branches"] });
    }
    return await MenuVersion.findAll({ where: { IsDeleted: false }, include: ["Branches"] });
  }

  async getById(id) {
    return await MenuVersion.findOne({ where: { MenuVer_PK: id, IsDeleted: false }, include: ["Branches"] });
  }

  async create(data) {
    try {
      const { branchPKs, versionData } = menuVersionData;
      const createdVersions = [];

      // Create menu version for each branch PK
      for (const branchPK of branchPKs) {
        const pk = await PKGenerator.generatePK('MenuVersions', 'MenuVer_PK');

        const menuVersion = await MenuVersion.create({
          MenuVer_PK: pk,
          MenuVer_Name: versionData.MenuVer_Name,
          MenuVer_BranchFK: branchPK,
          IsDeleted: false
        });

        createdVersions.push(menuVersion);
      }

      return createdVersions;
    } catch (error) {
      console.error("Error creating menu versions:", error);
      throw error;
    }
  }

  async update(id, data) {
    return await MenuVersion.update(data, { where: { MenuVer_PK: id } });
  }

  async delete(id) {
    return await MenuVersion.update({ IsDeleted: true }, { where: { MenuVer_PK: id } });
  }
}

module.exports = new MenuVersionRepository();

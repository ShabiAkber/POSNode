const IService = require("./IService");
const genModifireRepository = require("../repositories/GenModifireRepository");

class GenModifireService extends IService {
  constructor() {
    super(genModifireRepository);
  }

  async getAll(query) {
    return await genModifireRepository.getAll(query);
  }

  async getById(id) {
    return await genModifireRepository.getById(id);
  }

  async create(data) {
    return await genModifireRepository.create(data);
  }

  async update(id, data) {
    return await genModifireRepository.update(id, data);
  }

  async delete(id) {
    return await genModifireRepository.delete(id);
  }
}

module.exports = new GenModifireService();

const IService = require("./IService");
const menuVersionRepository = require("../repositories/MenuVersionRepository");
const MenuVersionDto = require("../dtos/MenuVersionDto");

class MenuVersionService extends IService {
  constructor() {
    super(menuVersionRepository);
  }

  async getAll(query) {
    return await menuVersionRepository.getAll(query);
  }

  async getById(id) {
    return await menuVersionRepository.getById(id);
  }

  async create(data) {
    // Validate using DTO
    const validationErrors = MenuVersionDto.validate(data);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(", "));
    }

    // Transform data using DTO
    const menuVersionDto = new MenuVersionDto(data);

    // Create menu versions
    return await menuVersionRepository.create(menuVersionDto.toJSON());
  }

  async update(id, data) {
    return await menuVersionRepository.update(id, data);
  }

  async delete(id) {
    return await menuVersionRepository.delete(id);
  }

  async createMultiple(data) {
    
  }
}

module.exports = new MenuVersionService();

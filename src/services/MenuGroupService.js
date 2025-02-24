const IService = require("./IService");
const menuGroupRepository = require("../repositories/MenuGroupRepository");
const MenuGroupDto = require("../dtos/MenuGroupDto");

class MenuGroupService extends IService {
  constructor() {
    super(menuGroupRepository);
  }

  async getAll(query) {
    return await menuGroupRepository.getAll(query);
  }

  async getById(id) {
    return await menuGroupRepository.getById(id);
  }

  async update(id, data) {
    return await menuGroupRepository.update(id, data);
  }

  async delete(id) {
    return await menuGroupRepository.delete(id);
  }

  async createMultiple(data) {
    // Validate using DTO
    const validationErrors = MenuGroupDto.validate(data);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(", "));
    }

    // Transform data using DTO
    const menuGroupDto = new MenuGroupDto(data);

    // Create menu groups
    return await menuGroupRepository.createMultiple(menuGroupDto.toJSON());
  }
}

module.exports = new MenuGroupService();

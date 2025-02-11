const IRepository = require("./IRepository");
const { UserTypes } = require("../models");

class UserTypeRepository extends IRepository {
    async getAll() {
        return await UserTypes.findAll();
    }

    async getById(id) {
        return await UserTypes.findByPk(id);
    }

    async create(data) {
        return await UserTypes.create(data);
    }

    async update(id, data) {
        const userType = await UserTypes.findByPk(id);
        if (!userType) return null;
        await userType.update(data);
        return userType;
    }

    async delete(id) {
        const userType = await UserTypes.findByPk(id);
        if (!userType) return null;
        await userType.destroy();
        return userType;
    }
}

module.exports = new UserTypeRepository();

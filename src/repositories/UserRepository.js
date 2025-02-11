const IRepository = require("./IRepository");
const { UserDetails } = require("../models");

class UserRepository extends IRepository {
    async getAll() {
        return await UserDetails.findAll();
    }

    async getById(id) {
        return await UserDetails.findByPk(id);
    }

    async create(data) {
        return await UserDetails.create(data);
    }

    async update(id, data) {
        const user = await this.getById(id);
        if (!user) return null;
        return await user.update(data);
    }

    async delete(id) {
        const user = await this.getById(id);
        if (!user) return null;
        await user.destroy();
        return true;
    }
}

module.exports = new UserRepository();

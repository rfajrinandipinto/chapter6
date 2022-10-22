const authRepository = require("../repositories/authRepository");


module.exports = {
    create(requestBody) {
        return authRepository.create(requestBody);
    },

    findUser(email) {
        return authRepository.findUser(email);
    },

    get(id) {
        return authRepository.find(id);
    },

    async list() {
        try {
            const users = await authRepository.findAll();
            const usersCount = await authRepository.getTotalUser();

            return {
                data: users,
                count: usersCount,
            };
        } catch (err) {
            throw err;
        }
    },

}
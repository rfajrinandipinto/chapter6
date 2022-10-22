const { Users } = require("../models");

module.exports = {
    create(createArgs) {
        return Users.create(createArgs);
    },

    findUser(email) {
        return Users.findOne({
            where: {
                email,
            },
        });
    },

    find(id) {
        return Users.findByPk(id);
    },

    findAll() {
        return Users.findAll();
    },

    getTotalUser() {
        return Users.count(); 
    }


}
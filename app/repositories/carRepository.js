const { Cars } = require("../models");

module.exports = {
  create(createArgs) {
    return Cars.create(createArgs);
  },

  update(id, updateArgs) {
    return Cars.update(updateArgs, {
      where: {
        id,
      },
    });
  },

  delete(id) {
    return Cars.destroy({
        where: {
            id,
        },
    });
  },

  find(id) {
    return Cars.findByPk(id);
  },

  findAll() {
    return Cars.findAll();
  },

  getTotalCar() {
    return Cars.count();
  },
};

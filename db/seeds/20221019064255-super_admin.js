'use strict';

const bcrypt = require("bcryptjs");
const SALT = 10;
const password = "superadmin";

function encryptPassword(password) {
  return new Promise((resolve,reject) => {
    bcrypt.hash(password, SALT, (err, encryptedPassword) => {
      if(!!err) {
        reject(err);
        return;
      }

      resolve(encryptedPassword);
    })
  })
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const encryptedPassword = await encryptPassword(password);

    return queryInterface.bulkInsert('Users', [{
      email: 'superadmin@gmail.com',
      encryptedPassword : encryptedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      roles : 'superadmin'
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      role: "superadmin"
    }, {});
  }
};

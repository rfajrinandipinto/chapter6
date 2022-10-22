'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cars.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name: DataTypes.STRING,
    size: DataTypes.INTEGER,
    rent: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    lastupdateby: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    deletedBy: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cars',
    paranoid: true
  });
  return Cars;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChecklistItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChecklistItem.init({
    item: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    checklistId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChecklistItem',
  });
  return ChecklistItem;
};
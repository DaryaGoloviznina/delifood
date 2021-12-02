'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Store, { through: models.Stores_Cuisine, foreignKey: 'cuisine_id', otherKey: 'store_id' });
    }
  };
  Cuisine.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cuisine',
  });
  return Cuisine;
};
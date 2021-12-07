'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stores_Cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
    }
  };
  Stores_Cuisine.init({
    store_id: DataTypes.UUID,
    cuisine_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Stores_Cuisine',
  });
  return Stores_Cuisine;
};
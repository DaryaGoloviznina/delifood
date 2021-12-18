'use strict';
const {
  Model
} = require('sequelize');

const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Cuisine, { through: models.Stores_Cuisine, foreignKey: 'store_id', otherKey: 'cuisine_id' });
      this.hasMany(models.Box, {foreignKey: 'store_id'});
    }

  };
  Store.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    country_code: DataTypes.STRING,
    lon: DataTypes.FLOAT,
    lat: DataTypes.FLOAT,
    store_img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Store',
  });

  return Store;
};
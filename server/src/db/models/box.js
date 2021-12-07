'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Box extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Store, {foreignKey: 'store_id'});
    }
  };
  Box.init({
    name: DataTypes.STRING,
    descr: DataTypes.TEXT,
    count: DataTypes.INTEGER,
    count_reserved: DataTypes.INTEGER,
    count_bought: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    rest_visibility: DataTypes.BOOLEAN,
    store_id: DataTypes.UUID,
  }, {
    sequelize,
    modelName: 'Box',
  });
  return Box;
};

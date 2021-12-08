'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Client, {foreignKey: 'client_id'});
      this.belongsTo(models.Box, {foreignKey: 'box_id'});
    }
  };
  Order.init({
    box_id: DataTypes.INTEGER,
    client_id: DataTypes.UUID,
    order_count: DataTypes.INTEGER,
    order_code: DataTypes.STRING,
    picked_up: DataTypes.BOOLEAN,
    rest_visibility: DataTypes.BOOLEAN,
    client_visibility: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};

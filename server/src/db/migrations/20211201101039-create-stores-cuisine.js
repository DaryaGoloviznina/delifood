'use strict';
const randStr = require('randomstring');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stores_Cuisines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      store_id: {
        type: Sequelize.UUID,
        references: { model: 'Stores', key: 'id' },
      },
      cuisine_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Cuisines', key: 'id' },
      },
      order_code: {
        type: Sequelize.STRING,
        defaultValue: randStr.generate(6),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stores_Cuisines');
  }
};
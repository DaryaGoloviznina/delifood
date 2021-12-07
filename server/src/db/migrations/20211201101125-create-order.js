'use strict';

const randStr = require('randomstring');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      box_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Boxes', key: 'id' },
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Clients', key: 'id' },
      },
      order_code: {
        type: Sequelize.STRING,
        defaultValue: randStr.generate(6),
      },
      picked_up: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      rest_visibility: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      client_visibility: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Orders');
  }
};

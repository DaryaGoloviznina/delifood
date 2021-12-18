'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => {
      return queryInterface.createTable('Stores', {
        id: {
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        name: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING
        },
        address: {
          type: Sequelize.STRING
        },
        lon: {
          type: Sequelize.FLOAT,
        },
        lat: {
          type: Sequelize.FLOAT,
        },
        country_code: {
          type: Sequelize.STRING,
        },
        store_img: {
          type: Sequelize.STRING,
          allowNull: true,
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
    })
    
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Stores');
  }
};
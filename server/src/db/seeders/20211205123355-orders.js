'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
  
      await queryInterface.bulkInsert('Orders', [{
        box_id: 1,
        client_id: 1,
        order_code: 'GGHKCS',
        picked_up: false,
        createdAt: new Date()
      },
      {
        box_id: 2,
        client_id: 2,
        order_code: 'QODJSK',
        picked_up: false,
        createdAt: new Date()
      },
      {
        box_id: 3,
        client_id: 3,
        order_code: 'QBDHHE',
        picked_up: false,
        createdAt: new Date()
      },
      {
        box_id: 1,
        client_id: 2,
        order_code: 'PODCJE',
        picked_up: false,
        createdAt: new Date()
      },
      {
        box_id: 3,
        client_id: 1,
        order_code: 'DUFDHL',
        picked_up: false,
        createdAt: new Date()
      },
      {
        box_id: 2,
        client_id: 1,
        order_code: 'MFVKGJ',
        picked_up: false,
        createdAt: new Date()
      }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};

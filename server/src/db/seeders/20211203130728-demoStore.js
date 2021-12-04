'use strict';
const bcrypt = require('bcryptjs');
const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const saltRounds = 10;

    const stores = [
      {
        name: faker.company.companyName(),
        password: await bcrypt.hash('123456', saltRounds),
        phone: faker.phone.phoneNumber(),
        email: faker.internet.email(),
        address: 'Москва, улица Охотный Ряд, 2',
        store_img: '/rests/images/1638553386417.png',
        lon: 55.757145,
        lat: 37.616542,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Stores', stores, {});
  
  },
};

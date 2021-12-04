'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Stores', 
    [
      { name: 'Campechano',
        email: 'campechano@gmail.com',
        password: '123123',
        address: '181 Bathurst St, Toronto, ON, Canada',
        store_img: 'https://cdn2.tropicalsky.co.uk/images/800x600/george-restaurant-moss-park-toronto.jpg',
        createdAt: new Date()
      },
      { name: 'Yasu',
        email: 'yasu@gmail.com',
        password: '123123',
        address: '81 Harbord Street, Toronto, ON, Canada',
        store_img: 'https://cdn3.tropicalsky.co.uk/images/800x600/auberge-du-pommier-toronto.jpg',
        createdAt: new Date()
      },
      { name: 'Antler Kitchen & Bar',
        email: 'bar@gmail.com',
        password: '123123',
        address: '1454 Dundas Street West, Toronto, ON, Canada',
        store_img: 'https://cdn1.tropicalsky.co.uk/images/800x600/yasu-sushi-restaurant-toronto.jpg',
        createdAt: new Date()
      },
      { name: 'Byblos',
        email: 'barrr@gmail.com',
        password: '123123',
        address: '11 Duncan Street, Toronto, ON, Canada',
        store_img: 'https://cdn4.tropicalsky.co.uk/images/800x600/antler-kitchen-bar-toronto.jpg',
        createdAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert('Boxes', 
    [
      { name: 'Campechano Box',
        descr: 'Awesome box here< buy stuff!',
        count: 2,
        price: 5,
        range: '18:00-20:00 p.m.',
        store_id: 1,
        createdAt: new Date()
      },
      { name: 'Yasu Box',
        descr: 'Boooox!!!',
        count: 1,
        price: 7,
        range: '17:00-21:00 p.m.',
        store_id: 2, 
        createdAt: new Date()
      },
      { name: 'Bar Box',
        descr: 'Buy our box',
        count: 6,
        price: 3,
        range: '18:00-23:00 p.m.',
        store_id: 3, 
        createdAt: new Date()
      },
      { name: 'Byblos Box',
        descr: 'Some stuf, box box',
        count: 1,
        price: 5,
        range: 'untill 19:00 p.m.',
        store_id: 4, 
        createdAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('Boxes', null, {});
    await queryInterface.bulkDelete('Stores', null, {});
  }
};

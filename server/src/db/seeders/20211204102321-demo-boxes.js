'use strict';

const { Client, Store, Box } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const Stores = await Store.bulkCreate(
      [
        { name: 'Campechano',
          email: 'campechano@gmail.com',
          password: '123123',
          address: '181 Bathurst St, Toronto, ON, Canada',
          lat: 43.831514,
          lon: -79.454675,
          phone: '89316541232',
          store_img: 'https://cdn2.tropicalsky.co.uk/images/800x600/george-restaurant-moss-park-toronto.jpg',
          createdAt: new Date()
        },
        { name: 'Yasu',
          email: 'yasu@gmail.com',
          password: '123123',
          address: '81 Harbord Street, Toronto, ON, Canada',
          lat: 43.660989,
          lon: -79.412158,
          phone: '89314455599',
          store_img: 'https://cdn3.tropicalsky.co.uk/images/800x600/auberge-du-pommier-toronto.jpg',
          createdAt: new Date()
        },
        { name: 'Antler Kitchen & Bar',
          email: 'bar@gmail.com',
          password: '123123',
          address: '1454 Dundas Street West, Toronto, ON, Canada',
          lat: 43.652367,
          lon: -79.400732,
          phone: '89317459632',
          store_img: 'https://cdn1.tropicalsky.co.uk/images/800x600/yasu-sushi-restaurant-toronto.jpg',
          createdAt: new Date()
        },
        { name: 'Byblos',
          email: 'barrr@gmail.com',
          password: '123123',
          address: '11 Duncan Street, Toronto, ON, Canada',
          lat: 43.648890,
          lon: -79.388928,
          phone: '89316667788',
          store_img: 'https://cdn4.tropicalsky.co.uk/images/800x600/antler-kitchen-bar-toronto.jpg',
          createdAt: new Date()
        },
      ]);

      const Boxes = await Box.bulkCreate([
        { name: 'Campechano Box',
          descr: 'Awesome box here< buy stuff!',
          count: 2,
          price: 5,
          start_date: new Date (2021, 11, 7, 17, 30),
          end_date: new Date (2021, 11, 7, 21, 30),
          store_id: Stores.find((el) => el.email === 'campechano@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Campechano Box',
          descr: 'ANOTHER BOX!!!!!',
          count: 1,
          price: 10,
          start_date: new Date (2021, 11, 7, 13, 30),
          end_date: new Date (2021, 11, 7, 23, 30),
          store_id: Stores.find((el) => el.email === 'campechano@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Yasu Box',
          descr: 'Boooox!!!',
          count: 1,
          price: 7,
          start_date: new Date (2021, 11, 7, 17, 0),
          end_date: new Date (2021, 11, 7, 21, 0),
          store_id: Stores.find((el) => el.email === 'yasu@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Yasu Box',
          descr: 'One more Yasu Box!!!',
          count: 1,
          price: 2,
          start_date: new Date (2021, 11, 7, 20, 0),
          end_date: new Date (2021, 11, 7, 21, 0),
          store_id: Stores.find((el) => el.email === 'yasu@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Yasu Box',
          descr: 'One more Yasu Box!!!',
          count: 1,
          price: 15,
          start_date: new Date (2021, 11, 7, 15, 0),
          end_date: new Date (2021, 11, 7, 19, 0),
          store_id: Stores.find((el) => el.email === 'yasu@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Bar Box',
          descr: 'Buy our box',
          count: 6,
          price: 3,
          start_date: new Date (2021, 11, 7, 14, 30),
          end_date: new Date (2021, 11, 7, 20, 0),
          store_id: Stores.find((el) => el.email === 'bar@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Byblos Box',
          descr: 'Some stuf, box box',
          count: 1,
          price: 5,
          start_date: new Date (2021, 11, 7, 19, 0),
          end_date: new Date (2021, 11, 7, 21, 0),
          store_id: Stores.find((el) => el.email === 'barrr@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Byblos Box',
          descr: 'Some stuf, box box',
          count: 1,
          price: 4,
          start_date: new Date (2021, 11, 7, 19, 30),
          end_date: new Date (2021, 11, 7, 20, 0),
          store_id: Stores.find((el) => el.email === 'barrr@gmail.com').id,
          createdAt: new Date()
        },
      ]) 
    
    await queryInterface.bulkInsert('Cuisines', 
    [
      { name: 'Any Cuisine',
        createdAt: new Date()
      },
      { name: 'Italian',
        createdAt: new Date()
      },
      { name: 'American',
        createdAt: new Date()
      },
      { name: 'French',
        createdAt: new Date()
      },
      { name: 'Japanese',
        createdAt: new Date()
      },
      { name: 'Chinese',
        createdAt: new Date()
      },
      { name: 'Vietnamese',
        createdAt: new Date()
      },
      { name: 'German',
        createdAt: new Date()
      },
      { name: 'Russian',
        createdAt: new Date()
      },
      { name: 'Greek',
        createdAt: new Date()
      },
      { name: 'Spanish',
        createdAt: new Date()
      },
      { name: 'Taiwanese',
        createdAt: new Date()
      },
      { name: 'Kazakh',
        createdAt: new Date()
      },
      { name: 'Georgian',
        createdAt: new Date()
      },
      { name: 'Mexican',
        createdAt: new Date()
      },
      { name: 'Middle Eastern',
        createdAt: new Date()
      },
    ], {});

    await queryInterface.bulkInsert('Stores_Cuisines', 
    [
      { 
        store_id: Stores.find((el) => el.email === 'campechano@gmail.com').id,
        cuisine_id: 2,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'yasu@gmail.com').id,
        cuisine_id: 3,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'bar@gmail.com').id,
        cuisine_id: 5,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'barrr@gmail.com').id,
        cuisine_id: 4,
        createdAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('Boxes', null, {});
    await queryInterface.bulkDelete('Stores', null, {});
  }
};

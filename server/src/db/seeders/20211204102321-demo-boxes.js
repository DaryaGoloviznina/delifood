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
        start_date: new Date (2021, 11, 4, 17, 30),
        end_date: new Date (2021, 11, 4, 21, 30),
        store_id: 1,
        createdAt: new Date()
      },
      { name: 'Yasu Box',
        descr: 'Boooox!!!',
        count: 1,
        price: 7,
        start_date: new Date (2021, 11, 4, 17, 0),
        end_date: new Date (2021, 11, 4, 21, 0),
        store_id: 2, 
        createdAt: new Date()
      },
      { name: 'Bar Box',
        descr: 'Buy our box',
        count: 6,
        price: 3,
        start_date: new Date (2021, 11, 4, 14, 30),
        end_date: new Date (2021, 11, 4, 20, 0),
        store_id: 3, 
        createdAt: new Date()
      },
      { name: 'Byblos Box',
        descr: 'Some stuf, box box',
        count: 1,
        price: 5,
        start_date: new Date (2021, 11, 4, 19, 0),
        end_date: new Date (2021, 11, 4, 21, 0),
        store_id: 4, 
        createdAt: new Date()
      },
    ], {});

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
      { store_id: 1,
        cuisine_id: 2,
        createdAt: new Date()
      },
      { store_id: 2,
        cuisine_id: 3,
        createdAt: new Date()
      },
      { store_id: 3,
        cuisine_id: 5,
        createdAt: new Date()
      },
      { store_id: 4,
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

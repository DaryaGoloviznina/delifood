// 'use strict';

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
          country_code: 'CA',
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
          country_code: 'CA',
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
          country_code: 'CA',
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
          country_code: 'CA',
          phone: '89316667788',
          store_img: 'https://cdn4.tropicalsky.co.uk/images/800x600/antler-kitchen-bar-toronto.jpg',
          createdAt: new Date()
        },
        //4
        { name: 'Jacobs & Co Steakhouse',
          email: 'steakhouse@gmail.com',
          password: '123123',
          address: '12 Yonge St, Toronto, ON, Canada',
          lat: 43.653226,
          lon: -79.383184,
          country_code: 'CA',
          phone: '613-387-4130',
          store_img: 'https://cdn5.tropicalsky.co.uk/images/800x600/byblos-restaurant-toronto.jpg',
          createdAt: new Date()
        },
        { name: 'The Elm Tree Restaurant',
          email: 'elmtree@gmail.com',
          password: '123123',
          address: '580 Church St, Toronto, ON, Canada',
          lat: 43.666682,
          lon: -79.381847,
          country_code: 'CA',
          phone: '403-516-5649',
          store_img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          createdAt: new Date()
        },
        { name: 'Alo Restaurant',
          email: 'alo@gmail.com',
          password: '123123',
          address: '900 Dufferin St Unit 515, Toronto, ON, Canada',
          lat: 43.654783,
          lon: -79.435779,
          country_code: 'CA',
          phone: '204-333-5123 ',
          store_img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: new Date()
        },
        { name: 'Canoe Restaurant & Bar',
          email: 'canoe@gmail.com',
          password: '123123',
          address: '515 Jarvis St, Toronto, ON, Canada',
          lat: 43.666847,
          lon: -79.378002,
          country_code: 'CA',
          phone: '778-322-6028',
          store_img: 'https://images.unsplash.com/photo-1606066352252-93e4d325787b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          createdAt: new Date()
        },
        { name: 'George Restaurant',
          email: 'george@gmail.com',
          password: '123123',
          address: '10 Baldwin St, Toronto, ON, Canada',
          lat: 43.656431,
          lon: -79.392727,
          country_code: 'CA',
          phone: '306-868-7659',
          store_img: 'https://images.unsplash.com/photo-1582359324766-9c2e09d83d43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: new Date()
        },
        { name: 'Scaramouche Restaurant',
          email: 'scaramouche@gmail.com',
          password: '123123',
          address: '317 Adelaide St, Toronto, ON, Canada',
          lat: 43.646870,
          lon: -79.392222,
          country_code: 'CA',
          phone: '514-910-3353',
          store_img: 'https://cdn3.tropicalsky.co.uk/images/800x600/scaramouche-restaurant-toronto.jpg',
          createdAt: new Date()
        },
        //10
        { name: '416 Snack Bar',
          email: '416@gmail.com',
          password: '123123',
          address: '197 College St, Toronto, ON, Canada',
          lat: 43.658590,
          lon: -79.395090,
          country_code: 'CA',
          phone: '647-200-0400 ',
          store_img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: new Date()
        },
        { name: 'Tutti Matti',
          email: 'tutti@gmail.com',
          password: '123123',
          address: '100 Queen St, Toronto, ON, Canada',
          lat: 43.653574,
          lon: -79.384464,
          country_code: 'CA',
          phone: '807-662-3113',
          store_img: 'https://images.unsplash.com/photo-1592335572252-e6d0a63cdb2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1165&q=80',
          createdAt: new Date()
        },
        { name: 'Le Swan',
          email: 'swan@gmail.com',
          password: '123123',
          address: '181 Bay St, Toronto, ON, Canada',
          lat: 43.646985,
          lon: -79.378411,
          country_code: 'CA',
          phone: '778-322-6028',
          store_img: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
          createdAt: new Date()
        },
        { name: 'Maple Leaf Tavern',
          email: 'maple@gmail.com',
          password: '123123',
          address: '1120 Front St, Toronto, ON, Canada',
          lat: 43.648192,
          lon: -79.374222,
          country_code: 'CA',
          phone: '306-534-1349',
          store_img: 'https://images.unsplash.com/photo-1586999768265-24af89630739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
          createdAt: new Date()
        },
        { name: 'GIA',
          email: 'gia@gmail.com',
          password: '123123',
          address: '93 Front St, Toronto, ON, Canada',
          lat: 43.649025,
          lon: -79.371564,
          country_code: 'CA',
          phone: '514-702-7433',
          store_img: 'https://images.unsplash.com/photo-1471253794676-0f039a6aae9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
          createdAt: new Date()
        },
      ]);

    await Box.bulkCreate([
      { name: 'Gia Box',
        descr: 'Only organic ingridients.',
        count: 5,
        price: 16,
        start_date: new Date (2021, 11, new Date().getDate(), 15, 30),
        end_date: new Date (2021, 11, new Date().getDate(), 21, 0),
        store_id: Stores.find((el) => el.email === 'gia@gmail.com').id,
        createdAt: new Date()
      },
      { name: '416 Christmas Box',
        descr: 'Christmas swets and maybe eggnog.',
        count: 5,
        price: 8,
        start_date: new Date (2021, 11, new Date().getDate(), 17, 00),
        end_date: new Date (2021, 11, new Date().getDate(), 22, 40),
        store_id: Stores.find((el) => el.email === '416@gmail.com').id,
        createdAt: new Date()
        },
        { name: 'Swan Party Box',
          descr: 'Delicious food for the party.',
          count: 2,
          price: 6,
          start_date: new Date (2021, 11, new Date().getDate(), 15, 30),
          end_date: new Date (2021, 11, new Date().getDate(), 20, 30),
          store_id: Stores.find((el) => el.email === 'swan@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Canoe Box',
          descr: 'We prepared some snacks and delicious mains.',
          count: 3,
          price: 11,
          start_date: new Date (2021, 11, new Date().getDate(), 15, 40),
          end_date: new Date (2021, 11, new Date().getDate(), 21, 00),
          store_id: Stores.find((el) => el.email === 'canoe@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Alo Goodies',
          descr: 'Surprise box from our restaurant',
          count: 3,
          price: 6,
          start_date: new Date (2021, 11, new Date().getDate(), 11, 00),
          end_date: new Date (2021, 11, new Date().getDate(), 20, 40),
          store_id: Stores.find((el) => el.email === 'alo@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Tutti Matti Box',
          descr: 'Simple yet DELICIOUS box.',
          count: 5,
          price: 5,
          start_date: new Date (2021, 11, new Date().getDate(), 14, 00),
          end_date: new Date (2021, 11, new Date().getDate(), 22, 40),
          store_id: Stores.find((el) => el.email === 'tutti@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Jacob & Co Box',
          descr: 'By popular demand. No dairy contained.',
          count: 2,
          price: 11,
          start_date: new Date (2021, 11, new Date().getDate(), 17, 00),
          end_date: new Date (2021, 11, new Date().getDate(), 21, 15),
          store_id: Stores.find((el) => el.email === 'steakhouse@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Elm Tree Surprise',
          descr: 'We gathered our best mains.',
          count: 2,
          price: 10,
          start_date: new Date (2021, 11, new Date().getDate(), 16, 00),
          end_date: new Date (2021, 11, new Date().getDate(), 23, 30),
          store_id: Stores.find((el) => el.email === 'elmtree@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Elm Tree Deserts',
          descr: 'We present the sweetest mystery box.',
          count: 1,
          price: 7,
          start_date: new Date (2021, 11, new Date().getDate(), 16, 00),
          end_date: new Date (2021, 11, new Date().getDate(), 22, 45),
          store_id: Stores.find((el) => el.email === 'elmtree@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Mystery Canoe Box',
          descr: 'We crafted this box with love and care.',
          count: 1,
          price: 7,
          start_date: new Date (2021, 11, new Date().getDate(), 16, 40),
          end_date: new Date (2021, 11, new Date().getDate(), 20, 35),
          store_id: Stores.find((el) => el.email === 'canoe@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Campechano Box',
          descr: 'We prepared an awesome box for you!',
          count: 2,
          price: 5,
          start_date: new Date (2021, 11, new Date().getDate(), 17, 30),
          end_date: new Date (2021, 11, new Date().getDate(), 21, 15),
          store_id: Stores.find((el) => el.email === 'campechano@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Box from Yasu with Love',
          descr: 'Our box containes only vegan ingridients.',
          count: 1,
          price: 7,
          start_date: new Date (2021, 11, new Date().getDate(), 17, 0),
          end_date: new Date (2021, 11, new Date().getDate(), 21, 45),
          store_id: Stores.find((el) => el.email === 'yasu@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Swan Mystery Box',
          descr: 'Your favourite food for cheap.',
          count: 7,
          price: 4,
          start_date: new Date (2021, 11, new Date().getDate(), 19, 0),
          end_date: new Date (2021, 11, new Date().getDate(), 23, 45),
          store_id: Stores.find((el) => el.email === 'swan@gmail.com').id,
          createdAt: new Date()
        },
        { name: 'Yasu Box Number 2',
        descr: 'This box features some vegan desserts.',
        count: 1,
        price: 15,
        start_date: new Date (2021, 11, new Date().getDate(), 15, 0),
        end_date: new Date (2021, 11, new Date().getDate(), 22, 0),
        store_id: Stores.find((el) => el.email === 'yasu@gmail.com').id,
        createdAt: new Date()
      },
      { name: 'Box from George',
          descr: 'Please arrive before pick up time ends.',
          count: 1,
          price: 8,
          start_date: new Date (2021, 11, new Date().getDate(), 17, 00),
          end_date: new Date (2021, 11, new Date().getDate(), 22, 30),
          store_id: Stores.find((el) => el.email === 'george@gmail.com').id,
          createdAt: new Date()
        },
      { name: 'Box from Our Bar',
        descr: 'For those who always wanted to try our food.',
        count: 6,
        price: 3,
        start_date: new Date (2021, 11, new Date().getDate(), 14, 30),
        end_date: new Date (2021, 11, new Date().getDate(), 20, 30),
        store_id: Stores.find((el) => el.email === 'bar@gmail.com').id,
        createdAt: new Date()
      },
      { name: 'Scaramouche Day Box',
        descr: 'Containes nuts and meet.',
        count: 2,
        price: 4,
        start_date: new Date (2021, 11, new Date().getDate(), 12, 00),
        end_date: new Date (2021, 11, new Date().getDate(), 23, 30),
        store_id: Stores.find((el) => el.email === 'scaramouche@gmail.com').id,
        createdAt: new Date()
        },
      { name: '416 Box',
        descr: 'Everything you love, but cheaper',
        count: 8,
        price: 4,
        start_date: new Date (2021, 11, new Date().getDate(), 12, 00),
        end_date: new Date (2021, 11, new Date().getDate(), 23, 40),
        store_id: Stores.find((el) => el.email === '416@gmail.com').id,
        createdAt: new Date()
        },
      { name: 'Yasu Box Number 3',
        descr: 'Our vegan goodies are looking for a new home!',
        count: 1,
        price: 2,
        start_date: new Date (2021, 11, new Date().getDate(), 20, 0),
        end_date: new Date (2021, 11, new Date().getDate(), 21, 0),
        store_id: Stores.find((el) => el.email === 'yasu@gmail.com').id,
        createdAt: new Date()
      },
      { name: 'Organic Box from GIA',
        descr: 'We sell fresh, always.',
        count: 2,
        price: 10,
        start_date: new Date (2021, 11, new Date().getDate(), 17, 30),
        end_date: new Date (2021, 11, new Date().getDate(), 21, 0),
        store_id: Stores.find((el) => el.email === 'gia@gmail.com').id,
        createdAt: new Date()
      },
      { name: 'Box from Campechano ',
        descr: 'Here are the best startes for the whole family.',
        count: 1,
        price: 10,
        start_date: new Date (2021, 11, new Date().getDate(), 13, 30),
        end_date: new Date (2021, 11, new Date().getDate(), 23, 30),
        store_id: Stores.find((el) => el.email === 'campechano@gmail.com').id,
        createdAt: new Date()
      },
      { name: '416 Box for Movie Night',
        descr: 'No movie night goes without us!',
        count: 2,
        price: 5,
        start_date: new Date (2021, 11, new Date().getDate(), 19, 00),
        end_date: new Date (2021, 11, new Date().getDate(), 21, 30),
        store_id: Stores.find((el) => el.email === '416@gmail.com').id,
        createdAt: new Date()
        },
      { name: 'Byblos Box',
        descr: 'Non allergic ingridients in this box.',
        count: 1,
        price: 5,
        start_date: new Date (2021, 11, new Date().getDate(), 12, 0),
        end_date: new Date (2021, 11, new Date().getDate(), 21, 0),
        store_id: Stores.find((el) => el.email === 'barrr@gmail.com').id,
        createdAt: new Date()
      },
      { name: 'Box from Scaramouche',
        descr: 'From yours truly. Contains milk.',
        count: 2,
        price: 15,
        start_date: new Date (2021, 11, new Date().getDate(), 14, 00),
        end_date: new Date (2021, 11, new Date().getDate(), 20, 35),
        store_id: Stores.find((el) => el.email === 'scaramouche@gmail.com').id,
        createdAt: new Date()
        },
      { name: 'Maple Leaf Box',
        descr: 'Please call us before picking up.',
        count: 3,
        price: 5,
        start_date: new Date (2021, 11, new Date().getDate(), 18, 30),
        end_date: new Date (2021, 11, new Date().getDate(), 23, 0),
        store_id: Stores.find((el) => el.email === 'maple@gmail.com').id,
        createdAt: new Date()
      },
      { name: 'Byblos Box',
        descr: 'Please bring your own bag to grab this box.',
        count: 1,
        price: 4,
        start_date: new Date (2021, 11, new Date().getDate(), 19, 30),
        end_date: new Date (2021, 11, new Date().getDate(), 20, 30),
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
      { 
        store_id: Stores.find((el) => el.email === 'steakhouse@gmail.com').id,
        cuisine_id: 2,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'elmtree@gmail.com').id,
        cuisine_id: 13,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'alo@gmail.com').id,
        cuisine_id: 4,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'canoe@gmail.com').id,
        cuisine_id: 2,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'george@gmail.com').id,
        cuisine_id: 1,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'scaramouche@gmail.com').id,
        cuisine_id: 3,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === '416@gmail.com').id,
        cuisine_id: 5,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'tutti@gmail.com').id,
        cuisine_id: 3,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'swan@gmail.com').id,
        cuisine_id: 13,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'maple@gmail.com').id,
        cuisine_id: 4,
        createdAt: new Date()
      },
      { 
        store_id: Stores.find((el) => el.email === 'gia@gmail.com').id,
        cuisine_id: 1,
        createdAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
  
    await queryInterface.bulkDelete('Boxes', null, {});
    await queryInterface.bulkDelete('Stores', null, {});
  }
};

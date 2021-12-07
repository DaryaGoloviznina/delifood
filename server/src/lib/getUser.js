const { Store, Client } = require('../db/models');

exports.getUser = async (email) => {
  let item = await Store.findOne({
    where: {email}, 
    attributes: { exclude: ['updatedAt', 'createdAt'] }
    })

  if (!item) item = await Client.findOne({
    where: {email}, 
    attributes: { exclude: ['updatedAt', 'createdAt'] }
  });
  return item;
}
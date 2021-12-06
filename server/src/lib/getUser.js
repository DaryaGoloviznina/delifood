const { Store, Client } = require("../db/models");

exports.getUser = async (param) => {

  let item = await Store.findOne({
    where: param,
    attributes: { exclude: ["updatedAt", "createdAt"] },
  });

  if (!item)
    item = await Client.findOne({
      where: param,
      attributes: { exclude: ["updatedAt", "createdAt"] },
    });

  return item;
};

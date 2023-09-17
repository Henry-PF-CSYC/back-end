const { Service } = require("../db");
const { Op } = require("sequelize");

const postServiceController = async (
    type,
    name,
    description,
    provider,
    price,
    image,
    status
) => {
    const newService = await Service.create({
        type,
        name,
        description,
        provider,
        price,
        image,
        status,
    });
    return newService;
};
const getServiceByNameController = async (name) => {
    const tolowerCaseName = name.toLowerCase();
    const service = await Service.findAll({
        where: { name: { [Op.iLike]: "%" + tolowerCaseName + "%" } },
    });
    return service;
};


const getAllServicesController = async (page = 1, limit = 10) => {
  const offset = page * limit - limit;
  const services = await Service.findAll({
      offset,
      limit,
  });
  return services;
};

module.exports = {
  postServiceController,
  getServiceByNameController,
  getAllServicesController,

};

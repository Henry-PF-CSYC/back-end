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

/*paginadado, 3card 1 en total 5 */
const getAllServicesController = async (page = 1, limit = 3) => {
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

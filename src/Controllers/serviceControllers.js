const { Service } = require("../db");
const {Op} = require("sequelize")

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
  return service
};

const gelAllServicesController = async () => {
  return await Service.findAll();
};

module.exports = {
  postServiceController,
  getServiceByNameController,
  gelAllServicesController,
};

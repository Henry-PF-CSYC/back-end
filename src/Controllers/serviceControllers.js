const { Service } = require("../db");

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

module.exports = {
  postServiceController,
};

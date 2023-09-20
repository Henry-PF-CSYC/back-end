const { Offer } = require("../db");

const getAllOfferController = async () => {
  return await Offer.findAll();
};

module.exports = {
  getAllOfferController,
};

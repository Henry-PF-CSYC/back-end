const { Offer } = require("../db");
const { filterOrderAndPaginateOffers } = require("../utils/offerUtils");
const { Op } = require("sequelize");
const getAllOfferController = async (req) => {
    const { title, type, order, orderBy, page, size } = req.query;
    let offers = [];
    if (title)
        offers = await Offer.findAll({
            where: { title: { [Op.iLike]: `%${title}%` } },
            paranoid: false,
        });
    else offers = await Offer.findAll({ paranoid: false });
    const { totalPages, paginated } = await filterOrderAndPaginateOffers(
        offers,
        type,
        order,
        orderBy,
        page,
        size
    );
    offers = paginated;

    return { totalPages, offers };
};

module.exports = {
    getAllOfferController,
};

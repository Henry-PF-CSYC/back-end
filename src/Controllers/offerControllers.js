const { Offer } = require("../db");
const { filterOrderAndPaginateOffers } = require("../utils/offerUtils");
const { Op } = require("sequelize");
const getAllOfferController = async (req) => {
    const { title, type, order, orderBy, page, size, user_type } = req.query;
    let offers = [];
    let is_paranoid = true;
    if (user_type === "admin" || user_type === "contact_admin")
        is_paranoid = false;
    else is_paranoid = true;
    if (title)
        offers = await Offer.findAll({
            where: { title: { [Op.iLike]: `%${title}%` } },
            paranoid: false,
        });
    else offers = await Offer.findAll({ paranoid: is_paranoid });
    if (offers.length === 0) {
        return {
            totalPages: 0,
            offers: [],
        };
    }
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

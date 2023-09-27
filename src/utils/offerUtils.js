const paginate = require("./paginate");
const filterByType = (offers, type) => {
    if (!type) return offers;
    type = type.toLowerCase();
    return offers.filter((offer) => offer.type == type);
};

const orderByTitle = (offers, order) => {
    if (order === "asc") {
        return offers.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "desc") {
        return offers.sort((a, b) => b.title.localeCompare(a.title));
    } else {
        return offers;
    }
};

const orderByUpdateDate = (offers, order) => {
    if (order === "asc") {
        return offers.sort((a, b) => a.updatedAt - b.updatedAt);
    } else if (order === "desc") {
        return offers.sort((a, b) => b.updatedAt - a.updatedAt);
    } else {
        return offers;
    }
};
const orderByCreationDate = (offers, order) => {
    if (order === "asc") {
        return offers.sort((a, b) => a.createdAt - b.createdAt);
    } else if (order === "desc") {
        return offers.sort((a, b) => b.createdAt - a.createdAt);
    } else {
        return offers;
    }
};

const filterOrderAndPaginateOffers = async (
    offers,
    type = "",
    order = "asc",
    orderBy = "creation",
    page = 1,
    size = 10
) => {
   offers =  filterByType(offers, type);
    const totalPages = Math.ceil(offers.length / size);
    switch (orderBy) {
        case "title":
            orderByTitle(offers, order);
            break;
        case "update":
            orderByUpdateDate(offers, order);
            break;
        case "creation":
            orderByCreationDate(offers, order);
            break;
        default:
            orderByCreationDate(offers, order);
            break;
    }
    const paginated = paginate(offers, page, size);
    return { totalPages, paginated };
};

module.exports = {
    filterByType,
    orderByTitle,
    orderByUpdateDate,
    orderByCreationDate,
    filterOrderAndPaginateOffers,
};

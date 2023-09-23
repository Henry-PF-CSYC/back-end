const { Service } = require("../db");
const { Op } = require("sequelize");
const {
    filterByType,
    filterByRange,
    orderByAlphabetical,
    orderByPrice,
    paginate,
} = require("../utils/serviceUtils");
const postArrayServiceController = async (array) => {
    const newServices = await Service.bulkCreate(array);
    return newServices;
};
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

const getNonDeletedsController = async (
    page = 1,
    size = 3,
    type = null,
    order = "ASC",
    orderBy = "price", //price or name
    min = 0,
    max = 999999999999999
) => {
    let ordered;

    const services = await Service.findAll();
    const ofType = filterByType(services, type);
    const ofRange = filterByRange(ofType, min, max);

    const totalPages = Math.ceil(ofRange.length / size);

    orderBy === "price"
        ? (ordered = orderByPrice(ofRange, order))
        : (ordered = orderByAlphabetical(ofRange, order));

    const paginated = paginate(ordered, page, size);

    return { totalPages, paginated };
};

module.exports = {
    postServiceController,
    getServiceByNameController,
    getNonDeletedsController,
    postArrayServiceController,
};

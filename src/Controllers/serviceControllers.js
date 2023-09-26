const { Service, Category } = require("../db");
const { Op } = require("sequelize");
const { filterAndPaginateServices } = require("../utils/serviceUtils");
const postArrayServiceController = async (array) => {
    const newServices = await Service.bulkCreate(array); //findOrCreate the type in Category table, associate it with the service
    const categories = await Category.findAll();
    newServices.forEach(async (service) => {
        const [category, created] = await Category.findOrCreate({
            where: { name: service.type },
        });
        await service.addCategory(category);
    });

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
    }); //findOrCreate the type in Category table, associate it with the service
    const [category, created] = await Category.findOrCreate({
        where: { name: type },
    });
    await newService.addCategory(category);

    return newService;
};

const getServicesFilteredAndPaginatedController = async (req) => {
    const { name, page, size, type, order, min, max, orderBy } = req.query;
    let services = [];

    if (!name) {
        services = await Service.findAll();
    } else {
        const parsed_name = name.toLowerCase().trim();
        services = await Service.findAll({
            where: {
                name: { [Op.iLike]: `%${parsed_name}%` },
            },
        });
    }
    const { totalPages, paginated } = await filterAndPaginateServices(
        services,
        page,
        size,
        type,
        order,
        min,
        max,
        orderBy
    );

    return { totalPages, paginated };
};

const deleteArrayServicesController = async (array_of_ids, hard) => {
    if (!hard) {
        const deletedServices = await Service.destroy({
            where: { id: { [Op.in]: array_of_ids } },
        });
        return deletedServices;
    } else {
        const deletedServices = await Service.destroy({
            where: { id: { [Op.in]: array_of_ids } },
            force: true,
            paranoid: false,
        });
        return deletedServices;
    }
};
const restoreArrayServicesController = async (array_of_ids) => {
    const restoredServices = await Service.restore({
        where: { id: { [Op.in]: array_of_ids } },
    });
    return restoredServices;
};

const deleteServiceController = async (id, hard) => {
    if (!hard) {
        const deletedService = await Service.destroy({
            where: { id: id },
        });
        return deletedService;
    } else {
        const deletedService = await Service.destroy({
            where: { id: id },
            force: true,
        });
        return deletedService;
    }
};

const restoreServiceController = async (id) => {
    const restoredService = await Service.restore({
        where: { id: id },
    });
    return restoredService;
};
module.exports = {
    postServiceController,
    getServicesFilteredAndPaginatedController,
    postArrayServiceController,

    deleteServiceController,
    restoreServiceController,
    deleteArrayServicesController,
    restoreArrayServicesController,
};

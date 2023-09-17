const { Service } = require('../db');

const filterServices = async (service, minPrice, maxPrice) => {
    let whereCondition = {};

    if (service) {
        whereCondition = {
            ...whereCondition,
            productbrand: service
        };
    }

    if (minPrice && maxPrice) {
        whereCondition = {
            ...whereCondition,
            price: {
                [Op.between]: [parseInt(minPrice), parseInt(maxPrice)],
            },
        };
    }

    try {
        const servicios = await Service.findAll({ where: whereCondition });
        return servicios;
    } catch (error) {
        throw new Error('Error al obtener los servicios.');
    }
};

const filterServicesByPriceRanges = async (minPrice, maxPrice) => {
    if (!minPrice || !maxPrice) {
        throw new Error('Debe proporcionar valores para minPrice y maxPrice.');
    }

    const parsedMinPrice = parseInt(minPrice);
    const parsedMaxPrice = parseInt(maxPrice);

    if (isNaN(parsedMinPrice) || isNaN(parsedMaxPrice)) {
        throw new Error('Los valores proporcionados para minPrice y maxPrice deben ser números válidos.');
    }

    if (parsedMinPrice >= parsedMaxPrice) {
        throw new Error('El precio mínimo debe ser mayor al precio máximo.');
    }

    try {
        const dbServices = await Service.findAll({
            where: {
                price: {
                    [Op.between]: [parsedMinPrice, parsedMaxPrice],
                },
            },
        });

        return dbServices;
    } catch (error) {
        throw new Error('Error al obtener los productos.');
    }
};

module.exports = { 
    filterServices,
    filterServicesByPriceRanges
 };
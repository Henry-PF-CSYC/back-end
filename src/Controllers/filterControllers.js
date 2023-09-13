const { Service } = require('../db');

const filterServices = async (servis, minPrice, maxPrice) => {
    let whereCondition = {};

    if (servis) {
        whereCondition = {
            ...whereCondition,
            productbrand: servis
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

module.exports = { filterServices };
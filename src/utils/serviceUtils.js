const paginate = require("./paginate");

const filterByType = (services, type) => {
    if (!type) return services;
    return services.filter((service) => service.type == type);
};

const filterByRange = (services, min, max) => {
    return services.filter(
        (service) => service.price >= min && service.price <= max
    );
};

const orderByAlphabetical = (services, order) => {
    if (order === "ASC") {
        return services.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "DESC") {
        return services.sort((a, b) => b.name.localeCompare(a.name));
    } else {
        return services;
    }
};

const orderByPrice = (services, order) => {
    if (order === "ASC") {
        return services.sort((a, b) => a.price - b.price);
    } else if (order === "DESC") {
        return services.sort((a, b) => b.price - a.price);
    } else {
        return services;
    }
};

module.exports = {
    filterByType,
    filterByRange,
    orderByAlphabetical,
    orderByPrice,
    paginate,
};

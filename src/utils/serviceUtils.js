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

const orderByName = (services, order) => {
    order = order.toLowerCase();
    if (order === "asc") {
        return services.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "desc") {
        return services.sort((a, b) => b.name.localeCompare(a.name));
    } else {
        return services;
    }
};

const orderByPrice = (services, order) => {
    order = order.toLowerCase();
    if (order === "asc") {
        return services.sort((a, b) => a.price - b.price);
    } else if (order === "asc") {
        return services.sort((a, b) => b.price - a.price);
    } else {
        return services;
    }
};

module.exports = {
    filterByType,
    filterByRange,
    orderByName,
    orderByPrice,
    paginate,
};

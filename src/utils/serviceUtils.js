const paginate = require("./paginate");
const filterAndPaginateServices = async (
    services = [],
    page = 1,
    size = 3,
    type = "",
    order = "asc",
    min = 0,
    max = 1000000,
    orderBy = "name" //can be price or name
) => {
    services = filterByType(services, type);
    services = filterByRange(services, min, max);

    const totalPages = Math.ceil(services.length / size);

    orderBy === "price"
        ? (services = orderByPrice(services, order))
        : (services = orderByName(services, order));

    const paginated = paginate(services, page, size);

    return { totalPages, paginated };
};
const filterByType = (services, type) => {
    if (!type) return services;
    type = type.toLowerCase();
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
    filterAndPaginateServices,
};

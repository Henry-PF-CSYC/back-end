const filterByType = (services, type) => {
    if (!type) return services;
    return services.filter((service) => service.type == type);
};

const orderByTitle = (services, order) => {
    if (order === "ASC") {
        return services.sort((a, b) => a.title.localeCompare(b.title));
    } else if (order === "DESC") {
        return services.sort((a, b) => b.title.localeCompare(a.title));
    } else {
        return services;
    }
};

const orderByDate = (services, order) => {
    if (order === "ASC") {
        return services.sort((a, b) => a.updatedAt - b.updatedAt);
    } else if (order === "DESC") {
        return services.sort((a, b) => b.updatedAt - a.updatedAt);
    } else {
        return services;
    }
};

module.exports = {
    filterByType,
    orderByTitle,
    orderByDate,
};

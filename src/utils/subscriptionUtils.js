const orderByDueDate = (array, direction) => {
    direction = direction.toUpperCase();
    if (direction === "ASC") {
        return array.sort((a, b) => {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            return dateA - dateB;
        });
    } else if (direction === "DESC") {
        return array.sort((a, b) => {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            return dateB - dateA;
        });
    }
};
const orderByStatus = (array, direction) => {
    direction = direction.toUpperCase();
    if (direction === "ASC") {
        return array.sort((a, b) => {
            const statusA = a.status;
            const statusB = b.status;
            if (statusA < statusB) {
                return -1;
            }
            if (statusA > statusB) {
                return 1;
            }
            return 0;
        });
    } else if (direction === "DESC") {
        return array.sort((a, b) => {
            const statusA = a.status;
            const statusB = b.status;
            if (statusA < statusB) {
                return 1;
            }
            if (statusA > statusB) {
                return -1;
            }
            return 0;
        });
    }
};
const orderByUser = (array, direction) => {
    direction = direction.toUpperCase();
    if (direction === "ASC") {
        return array.sort((a, b) => {
            const userA = a.user_id;
            const userB = b.user_id;
            if (userA < userB) {
                return -1;
            }
            if (userA > userB) {
                return 1;
            }
            return 0;
        });
    } else if (direction === "DESC") {
        return array.sort((a, b) => {
            const userA = a.user.name;
            const userB = b.user.name;
            if (userA < userB) {
                return 1;
            }
            if (userA > userB) {
                return -1;
            }
            return 0;
        });
    }
};
const orderByService = (array, direction) => {
    direction = direction.toUpperCase();
    if (direction === "ASC") {
        return array.sort((a, b) => {
            const serviceA = a.service.name;
            const serviceB = b.service.name;
            if (serviceA < serviceB) {
                return -1;
            }
            if (serviceA > serviceB) {
                return 1;
            }
            return 0;
        });
    } else if (direction === "DESC") {
        return array.sort((a, b) => {
            const serviceA = a.service.name;
            const serviceB = b.service.name;
            if (serviceA < serviceB) {
                return 1;
            }
            if (serviceA > serviceB) {
                return -1;
            }
            return 0;
        });
    }
};
//*

const filterByDueDate = (array, date) => {
    if (!date) return array;
    return array.filter((subscription) => subscription.dueDate == date);
};
const filterByStatus = (array, status) => {
    if (!status) return array;
    return array.filter((subscription) => subscription.status == status);
};
const filterByUser = (array, user) => {
    if (!user) return array;
    return array.filter((subscription) => subscription.user_id == user);
};
const filterByService = (array, service) => {
    if (!service) return array;
    return array.filter((subscription) => subscription.service_id == service);
};

module.exports = {
    orderByDueDate,
    orderByStatus,
    orderByUser,
    orderByService,
    filterByDueDate,
    filterByStatus,
    filterByUser,
    filterByService,
};

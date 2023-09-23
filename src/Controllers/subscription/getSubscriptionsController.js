const { Subscription, User, Service } = require("../../db");
const paginate = require("../../utils/paginate");
const {
    filterByDueDate,
    filterByStatus,
    filterByUser,
    filterByService,
    orderByService,
    orderByStatus,
    orderByUser,
    orderByDueDate,
} = require("../../utils/subscriptionUtils");

const getSubscriptionsController = async (
    page = 1,
    size = 10,
    due_date = "",
    status = "",
    user = "",
    service = "",
    order_by = "due_date",
    direction = "ASC"
) => {
    try {
        if (!size) {
            size = 10;
        }
        let subscriptions = await Subscription.findAll();
        subscriptions = filterByDueDate(subscriptions, due_date);
        subscriptions = filterByStatus(subscriptions, status);
        subscriptions = filterByUser(subscriptions, user);
        subscriptions = filterByService(subscriptions, service);

        const totalPages = Math.ceil(subscriptions.length / size);

        switch (order_by) {
            case "service":
                subscriptions = orderByService(subscriptions, direction);
                break;
            case "status":
                subscriptions = orderByStatus(subscriptions, direction);
                break;
            case "user":
                subscriptions = orderByUser(subscriptions, direction);
                break;

            default:
                subscriptions = orderByDueDate(subscriptions, direction);
                break;
        }

        const paginatedSubscriptions = paginate(subscriptions, page, size);
        return {
            statusCode: 200,
            totalPages,
            subscriptions: paginatedSubscriptions,
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
        };
    }
};

module.exports = getSubscriptionsController;

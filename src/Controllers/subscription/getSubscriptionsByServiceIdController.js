const { Subscription, Service, User } = require("../../db");
const paginate = require("../../utils/paginate");
const {
    filterByDueDate,
    filterByStatus,
    filterByUser,
    orderByUser,
    orderByStatus,
    orderByDueDate,
} = require("../../utils/subscriptionUtils");

const getSubscriptionsByServiceIdController = async (
    service_id,
    page = 1,
    size = 10,
    due_date = "",
    status = "",
    user = "",
    order_by = "due_date",
    direction = "ASC"
) => {
    /*      */
    try {
        const service = await Service.findOne({
            where: { id: service_id },
        });
        if (!service) {
            return {
                statusCode: 404,
                message: `Service with id "${service_id}" not found`,
            };
        }
        let subscriptions = await Subscription.findAll({
            where: { service_id },
            include: [
                {
                    model: User,
                    attributes: ["name", "email"],
                },
                {
                    model: Service,
                    attributes: ["id", "name"],
                },
            ],
        });
        subscriptions = filterByDueDate(subscriptions, due_date);
        subscriptions = filterByStatus(subscriptions, status);
        subscriptions = filterByUser(subscriptions, user);

        const totalPages = Math.ceil(subscriptions.length / size);

        switch (order_by) {
            case "user":
                subscriptions = orderByUser(subscriptions, direction);
                break;
            case "status":
                subscriptions = orderByStatus(subscriptions, direction);
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

module.exports = getSubscriptionsByServiceIdController;

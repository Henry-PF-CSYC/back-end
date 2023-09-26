const { Subscription, User, Service } = require("../../db");

const paginate = require("../../utils/paginate");
const {
    filterByDueDate,
    filterByStatus,
    filterByService,
    orderByService,
    orderByStatus,
    orderByDueDate,
} = require("../../utils/subscriptionUtils");
const getSubscriptionByUserEmailController = async (
    user_email,
    page = 1,
    size = 10,
    due_date = "",
    status = "",
    service = "",
    order_by = "due_date",
    direction = "ASC"
) => {
    try {
        const user = await User.findOne({
            where: { email: user_email },
        });
        if (!user) {
            return {
                statusCode: 404,
                message: `User with email "${user_email}" not found`,
            };
        }
        let subscriptions = await Subscription.findAll({
            where: { user_id: user_email },
            include: [
                {
                    model: User,
                    attributes: ["name", "lastname"],
                },
                {
                    model: Service,
                    attributes: ["name", "image", "description"],
                },
            ],
            raw: true,
        });
        if (subscriptions.length === 0) {
            return {
                statusCode: 404,
                message: `No subscriptions found for user with email "${user_email}" found`,
            };
        }

        subscriptions = filterByDueDate(subscriptions, due_date);
        subscriptions = filterByStatus(subscriptions, status);
        subscriptions = filterByService(subscriptions, service);

        const totalPages = Math.ceil(subscriptions.length / size);

        switch (order_by) {
            case "service":
                subscriptions = orderByService(subscriptions, direction);
                break;
            case "status":
                subscriptions = orderByStatus(subscriptions, direction);
                break;
            default:
                subscriptions = orderByDueDate(subscriptions, direction);
                break;
        }
        const paginatedSubscriptions = paginate(subscriptions, page, size);
        if (paginatedSubscriptions.length === 0) {
            return {
                statusCode: 404,
                message: `No matching subscriptions found`,
            };
        }

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

module.exports = getSubscriptionByUserEmailController;

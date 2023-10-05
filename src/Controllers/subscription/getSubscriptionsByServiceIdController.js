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
                    attributes: ["name", "lastname"],
                },
                {
                    model: Service,
                    attributes: ["name", "image", "description"],
                },
            ],
        });
        subscriptions = filterByDueDate(subscriptions, due_date);
        subscriptions = filterByStatus(subscriptions, status);
        subscriptions = filterByUser(subscriptions, user);

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

        const { totalPages, paginated } = paginate(subscriptions, page, size);
        if (paginated.length === 0) {
            return {
                statusCode: 404,
                message: `No subscriptions found for service with id "${service_id}" found`,
            };
        }

        return {
            statusCode: 200,
            totalPages,
            subscriptions: paginated,
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
        };
    }
};

module.exports = getSubscriptionsByServiceIdController;
/* 
{
    "subscriptions": [
        {
            "id": "2657e348-5b0b-40c2-9710-de76fd65b6a8",
            "due_date": "2023-10-24T02:00:00.000Z",
            "deletedAt": null,
            "status": "activa",
            "user_id": "jesus.emc@hotmail.com",
            "service_id": "95e91a24-aa1e-48d8-a745-cb14270785f6",
            "service_name": "Intermedio",
            "user_service_pair": "jesus.emc@hotmail.com-95e91a24-aa1e-48d8-a745-cb14270785f6",
            "createdAt": "2023-09-23T06:31:06.175Z",
            "updatedAt": "2023-09-23T06:35:32.209Z",
            "user": {
                "name": "ernesto",
                "email": "jesus.emc@hotmail.com"
            },
            "service": {
                "id": "95e91a24-aa1e-48d8-a745-cb14270785f6",
                "name": "Intermedio"
            }
        }
    ]
}

*/

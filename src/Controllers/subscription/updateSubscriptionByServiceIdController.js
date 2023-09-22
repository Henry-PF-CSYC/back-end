const { Subscription } = require("../../db");
const updateSubscriptionByServiceIdController = async (service_id) => {
    try {
        const subscription = await Subscription.findOne({
            where: { service_id },
        });
        if (!subscription) {
            return {
                statusCode: 404,
                message: `Subscription with id "${service_id}" not found`,
            };
        }
        if (subscription.deletedAt) {
            return {
                statusCode: 404,
                message: `Subscription with id "${service_id}" not found`,
            };
        }
        const currentDate = new Date();
        let dueDate = new Date(subscription.due_date);
        if (currentDate > dueDate && subscription.status === "active") {
            subscription.status = "overdue";
        } else if (currentDate < dueDate && subscription.status === "overdue") {
            subscription.status = "active";
        }
        dueDate.setMonth(dueDate.getMonth() + 1);
        subscription.due_date = dueDate;

        await subscription.save();
        return {
            statusCode: 200,
            subscription,
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
        };
    }
};

module.exports = updateSubscriptionByServiceIdController;

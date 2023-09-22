const { Subscription } = require("../../db");
const deleteSubscriptionByServiceIdController = async (service_id) => {
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
        subscription.status = "inactive";
        subscription.due_date = null;
        await subscription.save();
        await subscription.destroy();
        return {
            statusCode: 200,
            message: `Subscription with id "${service_id}" deleted`,
            subscription,
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
        };
    }
};

module.exports = deleteSubscriptionByServiceIdController;

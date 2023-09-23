const { Subscription } = require("../../db");
const updateSubscriptionByIdController = async (subscription_id) => {
    try {
        const subscription = await Subscription.findOne({
            _id: subscription_id,
        });
        if (!subscription) {
            return {
                statusCode: 404,
                message: "Subscription not found",
            };
        }

        let dueDate = new Date(subscription.due_date);
        const currentDate = new Date();
        const monthDiff = currentDate.getMonth() + 1 - (dueDate.getMonth() + 1);
        if (monthDiff > 1) {
            await subscription.destroy();
            return {
                statusCode: 200,
                message: "Subscription destroyed",
            };
        } else if (currentDate > dueDate && subscription.status === "activa") {
            subscription.status = "vencida";
        } else if (currentDate < dueDate && subscription.status === "vencida") {
            subscription.status = "activa";
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

module.exports = updateSubscriptionByIdController;

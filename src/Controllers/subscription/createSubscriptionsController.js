const { User, Service, Subscription } = require("../../db");

const createSubscriptionsController = async (user_email, service_ids) => {
    try {
        const user = await User.findOne({
            where: { email: user_email },
        });
        if (!user) {
            return {
                statusCode: 404,
                message: "User not found",
            };
        }
        let subscriptions = [];
        for (let i = 0; i < service_ids.length; i++) {
            subscriptions.push(
                await subscriptionCreatorHelper(user, service_ids[i])
            );
        }
        return {
            statusCode: 200,
            message: "Subscriptions created",
            subscriptions,
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
        };
    }
};
const subscriptionCreatorHelper = async (user, service_id) => {
    const service = await Service.findOne({
        where: { id: service_id },
    });
    if (!service) {
        return { error: `Service with id "${service_id}" not found` };
    }
    const [subscription, created] = await Subscription.findOrCreate({
        where: {
            user_id: user.email,
            service_id: service_id,
        },
        defaults: {
            status: "active",
        },
    });
    if (!created) {
        return {
            error: `Subscription for "${user.name}" to service "${service_id}" already exists`,
        };
    } else {
        return subscription;
    }
};

module.exports = createSubscriptionsController;

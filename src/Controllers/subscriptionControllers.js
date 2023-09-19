const { Subscription, User, Service } = require("../db");

const createSubscriptionController = async (
    due_date,
    user_email,
    service_id
) => {
    try {
        const status = "active";
        // Find the user by email
        const user = await User.findOne({ where: { email: user_email } });
        if (!user) {
            return { success: false, message: "User not found" };
        }

        // Find the service by id
        const service = await Service.findByPk(service_id);
        if (!service) {
            return { success: false, message: "Service not found" };
        }

        // Create the subscription
        const subscription = await Subscription.create({
            due_date,
            status,
            user_id: user.email,
            service_id,
        });

        return { success: true, subscription };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Error creating subscription" };
    }
};

module.exports = { createSubscriptionController };

module.exports = {
    createSubscriptionController,
    //getSubscriptionsController,
    //getSubscriptionsByUserIdController,
    //updateSubscriptionByIdController,
    //deleteSubscriptionByIdController,
    //getSubscriptionByEmailController,
};

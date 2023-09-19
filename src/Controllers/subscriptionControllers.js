const { Subscription, User, Service } = require("../db");

const createSubscriptionController = async (
    length_in_months,
    user_email,
    service_id
) => {
    try {
        const status = "active";
        let due_date = new Date();

        due_date.setMonth(due_date.getMonth() + parseInt(length_in_months));

        const user = await User.findOne({ where: { email: user_email } });
        if (!user) {
            return { success: false, message: "User not found" };
        }

        // Find the service by id
        const service = await Service.findByPk(service_id);
        if (!service) {
            return { success: false, message: "Service not found" };
        }

        // findOrCreate the subscription
        const [subscription, created] = await Subscription.findOrCreate({
            where: {
                user_id: user.email,
                service_id: service.id,
            },
            defaults: {
                due_date,
                status,
            },
        });
        if (!created) {
            throw new Error("Subscription already exists");
        }

        return subscription;
    } catch (error) {
        console.error(error);
        return { message: error.message };
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

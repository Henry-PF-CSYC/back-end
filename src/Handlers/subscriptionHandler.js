const {
    createSubscriptionController,
    //getSubscriptionsController,
    //getSubscriptionsByUserIdController,
    //updateSubscriptionByIdController,
    //deleteSubscriptionByIdController,
    //getSubscriptionByEmailController,
} = require("../Controllers/subscriptionControllers");

const createSubscription = async (req, res) => {
    try {
        const { length_in_months, user_email, service_id } = req.body;

        const subscription = await createSubscriptionController(
            length_in_months,
            user_email,
            service_id
        );
        res.status(201).json(subscription);
    } catch (error) {
        res.status(400).json(error.message);
    }
};
module.exports = {
    createSubscription,
    //getSubscriptions,
    //getSubscriptionsByUserId,
    //updateSubscriptionById,
    //deleteSubscriptionById,
    //getSubscriptionByEmail,
};

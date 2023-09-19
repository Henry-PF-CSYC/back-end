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
        const { due_date, user_email, service_id } = req.body;
        console.log({ due_date, user_email, service_id });
        const subscription = await createSubscriptionController(
            due_date,
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

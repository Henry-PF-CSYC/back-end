const {
    createSubscriptionsController,
    getSubscriptionsController,
    getSubscriptionsByServiceIdController,
    updateSubscriptionByIdController,
    deleteSubscriptionsController,
    getSubscriptionByUserEmailController,
} = require("../Controllers/subscriptionControllers");

const createSubscription = async (req, res) => {
    try {
        const { user_email, service_ids } = req.body;
        const { statusCode, message, subscriptions } =
            await createSubscriptionsController(user_email, service_ids);
        res.status(statusCode).send({ message, subscriptions });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getSubscriptions = async (req, res) => {
    try {
        const {
            page,
            size,
            due_date,
            status,
            user,
            service,
            order_by,
            direction,
        } = req.query;
        const { statusCode, totalPages, subscriptions } =
            await getSubscriptionsController(
                page,
                size,
                due_date,
                status,
                user,
                service,
                order_by,
                direction
            );
        res.status(statusCode).send({ totalPages, subscriptions });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const updateSubscriptionByServiceId = async (req, res) => {
    try {
        const { service_id } = req.params;

        const { statusCode, subscription } =
            await updateSubscriptionByIdController(service_id);
        res.status(statusCode).send(subscription);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const deleteSubscriptions = async (req, res) => {
    try {
        const { user_email, service_ids } = req.body;
        const { hard } = req.query;

        const { statusCode, message, subscription } =
            await deleteSubscriptionsController(user_email, service_ids, hard);
        res.status(statusCode).send({ message, subscription });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
const getSubscriptionByUserEmail = async (req, res) => {
    try {
        const { user_email } = req.params;
        const { page, size, due_date, status, service, order_by, direction } =
            req.query;
        const { statusCode, totalPages, subscriptions } =
            await getSubscriptionByUserEmailController(
                user_email,
                page,
                size,
                due_date,
                status,
                service,
                order_by,
                direction
            );
        res.status(statusCode).send({ totalPages, subscriptions });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};
const getSubscriptionsByServiceId = async (req, res) => {
    try {
        const { service_id } = req.params;
        const { page, size, due_date, status, user, order_by, direction } =
            req.query;
        const { statusCode, message, subscriptions } =
            await getSubscriptionsByServiceIdController(
                service_id,
                page,
                size,
                due_date,
                status,
                user,
                order_by,
                direction
            );
        res.status(statusCode).send({ message, subscriptions });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    createSubscription,
    getSubscriptions,
    updateSubscriptionByServiceId,
    deleteSubscriptions,
    getSubscriptionByUserEmail,
    getSubscriptionsByServiceId,
};

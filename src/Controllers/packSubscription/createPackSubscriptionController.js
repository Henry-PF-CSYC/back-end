const { Subscription, User, Pack, Services } = require("../../db");
//packSubscriptionRouter.get("/", getPackSubscriptions); //takes type=all to get all packSubscriptions, type=deleted to get deleted packSubscriptions, type=active to get active packSubscriptions
const getPackSubscriptionsController = async (req) => {
    const { type } = req.query;
    const subscriptions = await Subscription.findAll({
        where: {
            through_pack: true,
        },
        paranoid: type === "deleted" ? false : true,
    });
    const packs = [];
    for (let i = 0; i < subscriptions.length; i++) {
        const pack = await Pack.findOne({
            where: {
                id: subscriptions[i].pack_id,
            },
        });
        packs.push(pack);
    }
    return {
        statusCode: 200,
        message: "Subscriptions found",
        subscriptions,
        packs,
    };
};
const createPackSubscriptionController = async (req) => {
    const { user_email, pack_ids } = req.body;

    const user = await User.findOne({
        where: {
            email: user_email,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const subscriptions = [];
    const due_date = new Date(); //a month from now at 2000
    due_date.setMonth(due_date.getMonth() + 1);
    due_date.setHours(20, 0, 0, 0);
    const packs = [];
    let message = "Subscriptions created";

    for (let i = 0; i < pack_ids.length; i++) {
        const pack = await Pack.findOne({
            where: {
                id: pack_ids[i],
            },
        });
        if (!pack) {
            packs.push({
                error: `Pack ${pack_ids[i]} not found`,
            });
            continue;
        }
        packs.push(pack);
        subscriptions.push(
            await subscriptionToPackCreator(user, pack, due_date)
        );
    }
    //check if any of the subscriptions have the errorCode 409, change message accordingly
    for (let i = 0; i < subscriptions.length; i++) {
        for (let j = 0; j < subscriptions[i].length; j++) {
            if (subscriptions[i][j].errorCode === 409) {
                message = "Some subscriptions already existed";
                break;
            }
        }
    }
    //

    return {
        statusCode: 200,
        message,
        packs,
        subscriptions,
    };
};

const deletePackSubscriptionsController = async (req) => {
    const { user_email, pack_ids } = req.body;
    const { type } = req.query;
    const user = await User.findOne({
        where: {
            email: user_email,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }
    const packs = [];

    for (let i = 0; i < pack_ids.length; i++) {
        const pack = await Pack.findOne({
            where: {
                id: pack_ids[i],
            },
        });
        if (!pack) {
            packs.push({
                error: `Pack ${pack_ids[i]} not found`,
            });
            continue;
        }
        packs.push(pack);
    }

    const subscriptions = [];
    for (let i = 0; i < packs.length; i++) {
        const pack = packs[i];
        const packSubscriptions = await Subscription.findAll({
            where: {
                user_id: user.email,
                pack_id: pack.id,
                through_pack: true,
            },
        });
        if (packSubscriptions.length === 0) {
            subscriptions.push({
                errorCode: 404,
                error: `User ${user.email} is not subscribed to ${pack.name}`,
            });
            continue;
        }

        for (let j = 0; j < packSubscriptions.length; j++) {
            const subscription = packSubscriptions[j];
            subscriptions.push(await subscriptionDestroyer(subscription, type));
        }
    }
    let message = "Subscriptions deleted";
    //check if any of the subscriptions have the errorCode 404, change message accordingly
    for (let i = 0; i < subscriptions.length; i++) {
        if (subscriptions[i].errorCode === 404) {
            message = "Some subscriptions were not found";
            break;
        }
    }

    return {
        statusCode: 200,
        message,
        packs,
        subscriptions,
    };
};

const subscriptionDestroyer = async (subscription, type) => {
    if (type === "soft") {
        await subscription.destroy();
        if (subscription.due_date < new Date()) {
            subscription.status = "vencida";
            await subscription.save();
        } else {
            subscription.status = "inactiva";
            await subscription.save();
        }

        subscription.due_date = null;
        await subscription.save({ paranoid: false });
        await subscription.reload({ paranoid: false });
        return subscription;
    } else {
        await subscription.destroy({ force: true });
        return {
            message: `Subscription to ${subscription.service_name} deleted`,
        };
    }
};

const subscriptionToPackCreator = async (user, pack, due_date) => {
    const subscriptions = [];

    const services = await pack.getServices();

    for (let i = 0; i < services.length; i++) {
        const [subscription, created] = await Subscription.findOrCreate({
            where: {
                user_service_pair: `${user.email}-${services[i].id}`,
            },
            defaults: {
                due_date,
                status: "activa",
                user_id: user.email,
                service_id: services[i].id,
                service_name: services[i].name,
                user_service_pair: `${user.email}-${services[i].id}`,
                through_pack: true,
                pack_id: pack.id,
                due_payment:
                    services[i].price -
                    (pack.discount * services[i].price) / 100,
            },
        });
        if (!created) {
            subscriptions.push({
                errorCode: 409, //conflict
                message: `Conflict: Subscription to ${services[i].name} already exists`,
                error: `Subscription to ${services[i].name} already exists`,
            });
        } else {
            subscriptions.push(subscription);
        }
    }
    console.log("subscriptions", subscriptions);

    return subscriptions;
};

const restorePackSubscriptionController = async (req) => {
    //same as deletePackSubscriptionsController, restore instead of destroy
    //find user
    const { user_email, pack_ids } = req.body;
    const user = await User.findOne({
        where: {
            email: user_email,
        },
    });
    if (!user) {
        throw new Error("User not found");
    }
    const packs = [];

    for (let i = 0; i < pack_ids.length; i++) {
        const pack = await Pack.findOne({
            where: {
                id: pack_ids[i],
            },
        });
        if (!pack) {
            packs.push({
                error: `Pack ${pack_ids[i]} not found`,
            });
            continue;
        }
        packs.push(pack);
    }
    //find subscriptions
    const subscriptions = [];
    for (let i = 0; i < packs.length; i++) {
        const pack = packs[i];
        const packSubscriptions = await Subscription.findAll({
            where: {
                user_id: user.email,
                pack_id: pack.id,
                through_pack: true,
            },
            paranoid: false,
        });
        if (packSubscriptions.length === 0) {
            subscriptions.push({
                errorCode: 404,
                error: `User ${user.email} is not subscribed to ${pack.name}`,
            });
            continue;
        }

        for (let j = 0; j < packSubscriptions.length; j++) {
            const subscription = packSubscriptions[j];
            subscriptions.push(subscription);
            subscription.status = "activa";
            subscription.due_date = new Date();
            subscription.due_date.setMonth(
                subscription.due_date.getMonth() + 1
            );
            subscription.due_date.setHours(20, 0, 0, 0);

            await subscription.restore();
            await subscription.save();
        }
    }
    let message = "Subscriptions restored";
    //check if any of the subscriptions have the errorCode 404, change message accordingly
    for (let i = 0; i < subscriptions.length; i++) {
        if (subscriptions[i].errorCode === 404) {
            message = "Some subscriptions were not found";
            break;
        }
    }

    return {
        statusCode: 200,
        message,
        packs,
        subscriptions,
    };
};

module.exports = {
    createPackSubscriptionController,
    deletePackSubscriptionsController,
    restorePackSubscriptionController,
    getPackSubscriptionsController,
};

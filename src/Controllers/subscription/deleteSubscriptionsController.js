const { User, Service, Subscription } = require("../../db");
const mailer = require("nodemailer");
require("dotenv").config();
let errores = [];
const deleteSubscriptionsController = async (user_email, service_ids, hard) => {
    // Validate input
    if (!user_email || typeof user_email !== "string") {
        return {
            statusCode: 400,
            message: "Invalid user email",
        };
    }
    if (!Array.isArray(service_ids) || service_ids.length === 0) {
        return {
            statusCode: 400,
            message: "Invalid service IDs",
        };
    }

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
            const subscription = await subscriptionDeleterHelper(
                user,
                service_ids[i],
                hard
            );
            subscriptions.push(subscription);
        }

        // Check if there are any errors in the subscriptions
        const errors = subscriptions.filter(
            (subscription) => subscription.error
        );
        subscriptions = subscriptions.filter(
            (subscription) => !subscription.error
        );
        if (errors.length > 0) {
            if (subscriptions.length >= 1) {
                await notificationSendHelper(user, subscriptions, hard);
            }
            return {
                statusCode: 400,
                message: "Some subscriptions could not be deleted",
                subscriptions,
            };
        }

        if (subscriptions.length >= 1) {
            await notificationSendHelper(user, subscriptions, hard);
        }

        return {
            statusCode: 200,
            message: "Subscriptions deleted",
            subscriptions,
        };
    } catch (error) {
        return {
            statusCode: 500,
            message: error.message,
        };
    }
};

const subscriptionDeleterHelper = async (user, service_id, hard) => {
    const service = await Service.findOne({
        where: { id: service_id },
    });
    if (!service) {
        errores.push(`Servicio con id "${service_id}" no encontrado`);
        return { error: `Servicio con id "${service_id}" no encontrado` };
    }
    const subscription = await Subscription.findOne({
        where: {
            user_id: user.email,
            service_id: service.id,
        },
        include: [
            {
                model: User,
                attributes: ["name", "lastname"],
            },
            {
                model: Service,
                attributes: ["name", "image", "description"],
            },
        ],

        paranoid: false,
    });
    if (!subscription) {
        errores.push(`Suscripción a "${service.name}" no encontrada`);
        return {
            error: `Suscripción a "${service.name}" no encontrada`,
        };
    }
    try {
        if (hard === "true") {
            await subscription.destroy({ force: true });
            return {
                message: `${service.name}`,
            };
        } else {
            subscription.destroy();
            subscription.due_date = null;
            subscription.status = "inactiva";
            await subscription.save();
            return {
                message: `${service.name}`,
            };
        }
    } catch (error) {
        return { error: error.message };
    }
};

const notificationSendHelper = async (user, subscriptions, hard) => {
    const transporter = mailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_PASSWORD,
            authMethod: "PLAIN", // or "XOAUTH2"
        },
    });

    const htmlErrores = `<h1>Errores, por favor contacte al administrador:</h1>
        <ul>
        ${errores
            .map(
                (error) => `
            <li>
                ${error}
            </li>
        `
            )
            .join("")}
        </ul>`;

    const htmlSuccess = `<h1>Estimad@ ${user.name}</h1>
            <h2>Las suscripciones siguientes han sido ${
                hard === "true"
                    ? "permanentemente eliminadas"
                    : "deshabilitadas"
            }:</h2>
            <ul>
            ${subscriptions
                .map(
                    (subscription) => `
                <li>
                    ${subscription.message && subscription.message} 
                </li>
            `
                )
                .join("")}
        </ul>`;
    const html = errores.length > 0 ? htmlSuccess + htmlErrores : htmlSuccess;
    const mailOptions = {
        from: process.env.EMAIL_APP,
        to: user.email,
        subject: "Notificación de Eliminación de Suscripción",
        html: html,
    };
    try {
        await transporter.sendMail(mailOptions);
        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = deleteSubscriptionsController;

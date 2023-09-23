const { Subscription } = require("../../db");
const mailer = require("nodemailer");
require("dotenv").config();
const updateSubscriptionByIdController = async (subscription_id) => {
    try {
        const subscription = await Subscription.findOne({
            id: subscription_id,
            include: ["user", "service"],
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
        if (monthDiff >= 1) {
            //send notification using nodemailer that the subscription is deleted due to non payment
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
            const html = `<h1>Estimado ${subscription.user.name} ${subscription.user.lastname}</h1>
            <p>Le informamos que su suscripción al servicio ${subscription.service.name} ha sido cancelada debido a falta de pago.</p>
            <p>Para reactivar su suscripción, por favor ingrese a su cuenta y realice el pago correspondiente.</p>
            <p>Atentamente,</p>{
                <p>El equipo de Csyc</p>
            }`;

            const mailOptions = {
                from: process.env.EMAIL_APP,
                to: subscription.user.email,
                subject: "Suscripción cancelada",
                html: html,
            };
            await transporter
                .sendMail({
                    ...mailOptions,
                })
                .catch((error) => {
                    throw error;
                });

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

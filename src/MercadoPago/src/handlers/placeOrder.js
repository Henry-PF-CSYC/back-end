const mercadopago = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN, FRONT_END_URL } = process.env;

mercadopago.configure({
    access_token: ACCESS_TOKEN,
});

const placeOrder = async (req, res) => {
    try {
        const items = req.body;

        let preference = {
            back_urls: {
                success: `${FRONT_END_URL}/usuario`, // URL en caso de éxitoURL en caso de pendiente
                //pending: "http://localhost:3000/pending", // URL en caso de pendiente
                //failure: "http://localhost:3000/failed", // URL en caso de error
            },
            items,
        };

        const response = await mercadopago.preferences.create(preference);
        res.status(200).json({ response });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = placeOrder;

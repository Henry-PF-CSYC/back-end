const { Offer, User } = require("../db");

const { getAllOfferController } = require("../Controllers/offerControllers");

const postOfferHandler = async (req, res) => {
    const { title, description, contact, type, user_email, image, price } =
        req.body;
    try {
        const user = await User.findOne({ where: { email: user_email } });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const newOffer = await Offer.create({
            title,
            description,
            contact: contact.toString(),
            type,
            user_id: user.email,
            image,
            price,
        });
        return res.status(201).json(newOffer);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getOfferHandler = async (req, res) => {
    try {
        const { totalPages, offers } = await getAllOfferController(req);
        if (offers.length === 0) {
            return res
                .status(400)
                .json({ message: "No se encontró ninguna oferta" });
        }
        return res.status(200).json({ totalPages, offers });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const getOffersByUser = async (req, res) => {
    const userEmail = req.params.email;
    try {
        const user = await User.findByPk(userEmail);
        if (!user) {
            return res
                .status(400)
                .json({ message: "No se encontró ningún usuario" });
        }
        const userOffer = await Offer.findAll({
            paranoid: false,
            where: { user_id: userEmail },
        });
        if (userOffer.length === 0) {
            return res
                .status(400)
                .json({ message: "El usuario no tiene ofertas" });
        }
        return res.status(200).json(userOffer);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getOfferById = async (req, res) => {
    const offerId = req.params.id;
    try {
        const offer = await Offer.findByPk(offerId, { paranoid: false });
        if (!offer) {
            return res
                .status(400)
                .json({ message: "No se encontró ninguna oferta" });
        }
        return res.status(200).json(offer);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
// Model.findOne({
//   where: { id: id },
//   paranoid: false
// });

const deleteOfferHandler = async (req, res) => {
    const offerId = req.params.id;
    const { type } = req.query;
    try {
        const offer = await Offer.findByPk(offerId);
        if (!offer) {
            return res
                .status(400)
                .json({ error: "No se encontró ninguna oferta" });
        }
        if (type === "hard") {
            await offer.destroy({ force: true });
        } else {
            await offer.destroy();
        }
        return res.status(200).json({ message: "oferta eliminada con éxito" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const putOfferRestore = async (req, res) => {
    const offerId = req.params.id;
    try {
        const offer = await Offer.findByPk(offerId, { paranoid: false });
        if (!offer) {
            return res
                .status(400)
                .json({ message: "No se encontró ninguna oferta" });
        }
        await offer.restore();
        return res.status(200).json({ message: "oferta restaurada con éxito" });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = {
    postOfferHandler,
    getOfferHandler,
    getOffersByUser,
    deleteOfferHandler,
    getOfferById,
    putOfferRestore,
};

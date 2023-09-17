const { Service } = require("../db");

const {
    postServiceController,
    getServiceByNameController,
    gelAllServicesController,
} = require("../Controllers/serviceControllers");

const postServiceHandler = async (req, res) => {
    const { type, name, description, provider, price, image, status } =
        req.body;
    try {
        const newService = await postServiceController(
            type,
            name,
            description,
            provider,
            price,
            image,
            status
        );
        res.status(200).json(newService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getAllService = async (req, res) => {
    const { name } = req.query;
    try {
        const service = name
            ? await getServiceByNameController(name)
            : await gelAllServicesController();
        if (service.length === 0) {
            return res
                .status(400)
                .json({ message: "No se encontró ningun servicio" });
        }
        return res.status(200).json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getServiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const service = await Service.findOne({
            where: { id: id },
        });
        if (!service) {
            return res
                .status(400)
                .json({ message: "No se encontro el servicio" });
        }
        return res.status(200).json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
module.exports = { postServiceHandler, getAllService, getServiceById };

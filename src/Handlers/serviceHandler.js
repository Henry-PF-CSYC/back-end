const { Service } = require("../db");

const {
    postServiceController,
    getServiceByNameController,
    getAllServicesController,
    postArrayServiceController,
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
const postArrayServiceHandler = async (req, res) => {
    const array = req.body;
    try {
        const newServices = await postArrayServiceController(array);
        res.status(200).json(newServices);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getAllService = async (req, res) => {
    const { name, page, size, type, order, min, max, orderBy } = req.query;

    try {
        const service = name
            ? await getServiceByNameController(name)
            : await getAllServicesController(
                  page,
                  size,
                  type,
                  order,
                  orderBy,
                  min,
                  max
              );
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

/* const getAllServicesHandler = async () => {
    try {
        // Llama al controlador getAllServicesController con los parámetros de consulta
        const services = await getAllServicesController(page, limit);

        // Envía los servicios como respuesta en formato JSON
        res.json(services);
    } catch (error) {
        console.error(error);
        // Maneja los errores y devuelve una respuesta de error apropiada
        res.status(400).json({ error: "Error interno del servidor" });
    }
}; */

module.exports = {
    postServiceHandler,
    getAllService,
    getServiceById,
    postArrayServiceHandler,
};

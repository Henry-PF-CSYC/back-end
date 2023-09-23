const { Service } = require("../db");

const {
    postServiceController,
    getServiceByNameController,
    getNonDeletedServicesController,
    postArrayServiceController,

    deleteServiceController,
    restoreServiceController,
    deleteArrayServicesController,
    restoreArrayServicesController,
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
const getNonDeleted = async (req, res) => {
    const { name, page, size, type, order, min, max, orderBy } = req.query;

    try {
        let service = [];
        let count = 0;
        if (name) {
            service = await getServiceByNameController(name);
            count = Math.ceil(service.length / size);
        } else {
            const { totalPages, paginated } =
                await getNonDeletedServicesController(
                    page,
                    size,
                    type,
                    order,
                    orderBy,
                    min,
                    max
                );
            service = paginated;
            count = totalPages;
        }

        if (count === 0) {
            return res
                .status(400)
                .json({ message: "No se encontró ningun servicio" });
        }

        return res.status(200).json({ count, service });
    } catch (error) {
        console.log(error);
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

const getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll({
            paranoid: false,
        });
        if (!services) {
            return res
                .status(400)
                .json({ message: "No se encontraron servicios" });
        }
        return res.status(200).json(services);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateServiceHandler = async (req, res) => {
    const { id } = req.params;
    const { type, name, description, provider, price, image, status } =
        req.body;
    try {
        const service = await Service.findOne({
            where: { id: id },
        });
        if (!service) {
            return res
                .status(400)
                .json({ message: "No se encontro el servicio" });
        }
        const updatedService = await service.update({
            type,
            name,
            description,
            provider,
            price,
            image,
            status,
        });
        return res.status(200).json(updatedService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteServiceHandler = async (req, res) => {
    const { id } = req.params;
    const { hard } = req.query;
    try {
        const deletedService = await deleteServiceController(id, hard);
        if (!deletedService) {
            return res
                .status(400)
                .json({ message: "No se encontro el servicio" });
        }
        return res.status(200).json(deletedService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const restoreServiceHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const restoredService = await restoreServiceController(id);
        if (!restoredService) {
            return res
                .status(400)
                .json({ message: "No se encontro el servicio" });
        }
        return res.status(200).json(restoredService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteArrayServiceHandler = async (req, res) => {
    const { hard } = req.query;
    const { array } = req.body;
    try {
        const deletedServices = await deleteArrayServicesController(
            array,
            hard
        );
        if (!deletedServices) {
            return res
                .status(400)
                .json({ message: "No se encontraron los servicios" });
        }
        return res.status(200).json(deletedServices);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const restoreArrayServiceHandler = async (req, res) => {
    const { array } = req.body;
    try {
        const restoredServices = await restoreArrayServicesController(array);
        if (!restoredServices) {
            return res
                .status(400)
                .json({ message: "No se encontraron los servicios" });
        }
        return res.status(200).json(restoredServices);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    postServiceHandler,
    getNonDeleted,
    getServiceById,
    postArrayServiceHandler,

    getAllServices,
    updateServiceHandler,

    deleteServiceHandler,
    restoreServiceHandler,
    deleteArrayServiceHandler,
    restoreArrayServiceHandler,
};

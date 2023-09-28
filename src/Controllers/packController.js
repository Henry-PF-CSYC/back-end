const { Pack, Service } = require("../db");
const { Op } = require("sequelize");

const getPacksController = async (req) => {
    const { type } = req.query;
    switch (type) {
        case "all":
            const allPacks = await Pack.findAll({
                include: [
                    {
                        model: Service,
                        attributes: ["id", "name", "price"],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            });
            if (!allPacks.length) {
                throw new Error("No packs found");
            }
            return { message: "All packs", packs: allPacks };
        case "deleted":
            const deletedPacks = await Pack.findAll({
                paranoid: false,
                where: {
                    deletedAt: {
                        [Op.not]: null,
                    },
                },
                include: [
                    {
                        model: Service,
                        attributes: ["id", "name", "price"],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            });
            if (!deletedPacks.length) {
                throw new Error("No deleted packs found");
            }
            return {
                message: "Deleted packs",
                packs: deletedPacks,
            };
        default: //active
            const activePacks = await Pack.findAll({
                where: {
                    deletedAt: null,
                },
                include: [
                    {
                        model: Service,
                        attributes: ["id", "name", "price"],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            });
            if (!activePacks.length) {
                throw new Error("No active packs found");
            }
            return {
                message: "Active packs",
                packs: activePacks,
            };
    }
};

const getPackByIdController = async (req) => {
    const { id } = req.params;
    const pack = await Pack.findByPk(id, {
        include: [
            {
                model: Service,
                attributes: ["id", "name", "price"],
                through: {
                    attributes: [],
                },
            },
        ],
    });
    if (!pack) {
        throw new Error("Pack not found");
    }
    return {
        message: `Pack ${pack.name}`,
        pack,
    };
};

const createPackController = async (req) => {
    const { name, description, discount, services_ids, image } = req.body;

    const services = await Service.findAll({
        where: {
            id: services_ids,
        },
    });
    const original_total = services.reduce(
        (acc, service) => acc + service.price,
        0
    );
    //discount is a number between 0 and 100 , treat it as a percentage
    const final_total = original_total - (original_total * discount) / 100;

    const packToCreate = {
        name,
        description,
        original_total,
        final_total,
        discount,
        image,
    };

    const newPack = await Pack.create(packToCreate);
    await newPack.setServices(services);
    const packCreated = await Pack.findByPk(newPack.id, {
        include: [
            {
                model: Service,
                attributes: ["id", "name", "price"],
                through: {
                    attributes: [],
                },
            },
        ],
    });
    return {
        message: `Combo ${packCreated.name} creado con exito`,
        pack: packCreated,
    };
};

const deletePackController = async (req) => {
    const { id } = req.params;
    const { type } = req.query;
    //find one including services
    const packToDelete = await Pack.findByPk(id, {
        include: [
            {
                model: Service,
                attributes: ["id", "name", "price"],
                through: {
                    attributes: [],
                },
            },
        ],
    });

    if (!packToDelete) {
        throw new Error("Pack not found");
    }

    if (type === "hard") {
        packToDelete.destroy({ force: true });
        return `Combo ${packToDelete.name} eliminado con exito`;
    }
    packToDelete.destroy();

    return {
        message: `Combo ${packToDelete.name} eliminado con exito`,
        pack: packToDelete,
    };
};

const restorePackController = async (req) => {
    const { id } = req.params; //find one including services
    const packToRestore = await Pack.findByPk(id, {
        include: [
            {
                model: Service,
                attributes: ["id", "name", "price"],
                through: {
                    attributes: [],
                },
            },
        ],
        paranoid: false,
    });

    packToRestore.restore();

    return {
        message: `Combo ${packToRestore.name} restaurado con exito`,
        pack: packToRestore,
    };
};

const updatePackController = async (req) => {
    const { id } = req.params;
    const { name, description, discount, services_ids } = req.body;

    const services = await Service.findAll({
        where: {
            id: services_ids,
        },
    });
    const original_total = services.reduce(
        (acc, service) => acc + service.price,
        0
    );
    const final_total = original_total - original_total * (discount ?? 0);

    const packToUpdate = await Pack.findByPk(id, {
        include: [
            {
                model: Service,
                attributes: ["id", "name", "price"],
                through: {
                    attributes: [],
                },
            },
        ],
    });
    const newData = {
        name: name || packToUpdate.name,
        description: description || packToUpdate.description,
        original_total: original_total || packToUpdate.original_total,
        final_total: final_total || packToUpdate.final_total,
        discount: discount || packToUpdate.discount,
    };
    await packToUpdate.update(newData);
    await packToUpdate.setServices(services);

    await packToUpdate.save();

    await packToUpdate.reload();

    return {
        message: `Combo ${packToUpdate.name} actualizado con exito`,
        pack: packToUpdate,
    };
};

module.exports = {
    createPackController,
    deletePackController,
    restorePackController,
    updatePackController,
    getPacksController,
    getPackByIdController,
};

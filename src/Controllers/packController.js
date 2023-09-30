const { Pack, Service } = require("../db");
const { Op } = require("sequelize");
const crypto = require("crypto");
const getPacksController = async (req) => {
    const { type } = req.query;
    switch (type) {
        case "all":
            const allPacks = await Pack.findAll({
                include: [
                    {
                        model: Service,
                        attributes: ["id", "name", "price", "image"],
                        through: {
                            attributes: [],
                        },
                    },
                ],
                paranoid: false,
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
                        attributes: ["id", "name", "price", "image"],
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
                        attributes: ["id", "name", "price", "image"],
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
                attributes: ["id", "name", "price", "image"],
                through: {
                    attributes: [],
                },
            },
        ],
        paranoid: false,
    });
    if (!pack) {
        throw new Error("Pack not found");
    }
    return pack;
};

const createPackController = async (req) => {
    const { name, description, discount, services_ids, image } = req.body;

    const service_set_identifier = crypto
        .createHash("sha256")
        .update(services_ids.sort().join(""))
        .digest("hex")
        .slice(0, 32);

    const existing = await Pack.findOne({
        where: {
            service_set_identifier,
        },
        paranoid: false,
        raw: true,
    });
    const services = await Service.findAll({
        where: {
            id: services_ids,
        },
    });
    const services_names = services.map((service) => service.name);
    if (!existing) {
        const original_total = services.reduce(
            (acc, service) => acc + service.price,
            0
        );

        const final_total = original_total - (original_total * discount) / 100;

        const packToCreate = {
            name,
            description,
            original_total,
            final_total,
            discount,
            image,
            service_set_identifier,
        };

        const newPack = await Pack.create(packToCreate);
        await newPack.setServices(services);
        const packCreated = await Pack.findByPk(newPack.id, {
            include: [
                {
                    model: Service,
                    attributes: ["id", "name", "price", "image"],
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
        return {
            error: false,
            message: `Combo ${packCreated.name} creado con exito`,
            pack: packCreated,
        };
    }

    return {
        error: true,
        message: `Ya existe un combo con los servicios ${services_names.join(
            ", "
        )}`,
        pack: existing,
    };
};

const createArrayPacksController = async (req) => {
    const packs = req.body;
    //take each object from the array and pass it to the createPackController in an object {body: pack}
    const packsCreated = await Promise.all(
        packs.map(async (pack) => {
            const {
                error,
                message,
                pack: packCreated,
            } = await createPackController({
                body: pack,
            });
            if (error) {
                return {
                    message,
                };
            }
            return packCreated;
        })
    );
    return {
        message: `Combos creados con exito`,
        packs: packsCreated,
    };
};
const deletePackArrayController = async (req) => {
    const { type } = req.query;
    let force = true;
    if (type === "soft") force = false;
    else force = true;
    const packs = req.body;
    const packsToDelete = await packs.map(async (pack) => {
        const { name } = pack;
        const packToDelete = await Pack.findOne({
            where: {
                name,
            },
            paranoid: false,
        });
        if (!packToDelete) {
            return {
                message: `No se encontro el combo ${name}`,
            };
        }
        return packToDelete;
    });
    await Promise.all(packsToDelete);
    await Pack.destroy({
        where: {
            name: packs.map((pack) => pack.name),
        },
        force: force,
    });
    return {
        message: `Combos eliminados con exito`,
        packs: packs.map((pack) => pack.name),
    };
};

const deletePackController = async (req) => {
    const { id } = req.params;
    const { type } = req.query;
    const packToDelete = await Pack.findByPk(id, {
        include: [
            {
                model: Service,
                attributes: ["id", "name", "price", "image"],
                through: {
                    attributes: [],
                },
            },
        ],
        paranoid: false,
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
                attributes: ["id", "name", "price", "image"],
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
    const { name, description, discount, services_ids, image } = req.body;
    const service_set_identifier = crypto
        .createHash("sha256")
        .update(services_ids.sort().join(""))
        .digest("hex")
        .slice(0, 32);

    const services = await Service.findAll({
        where: {
            id: services_ids,
        },
    });
    const original_total = services.reduce(
        (acc, service) => acc + service.price,
        0
    );

    const final_total = original_total - original_total * discount * 0.01;

    const packToUpdate = await Pack.findByPk(id, {
        include: [
            {
                model: Service,
                attributes: ["id", "name", "price", "image"],
                through: {
                    attributes: [],
                },
            },
        ],
    });
    const newData = {
        name: name || packToUpdate.name,
        description: description || packToUpdate.description,
        original_total: original_total ?? packToUpdate.original_total,
        final_total: final_total ?? packToUpdate.final_total,
        discount: discount ?? packToUpdate.discount,
        image: image || packToUpdate.image,
        service_set_identifier:
            service_set_identifier || packToUpdate.service_set_identifier,
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
    createArrayPacksController,
    deletePackArrayController,
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "subscription",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },

            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },

            user_id: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "users",
                    key: "email",
                },
            },
            service_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "services",
                    key: "id",
                },
            },
            service_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_service_pair: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            through_pack: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            pack_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: "packs",
                    key: "id",
                },
            },
            due_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            due_payment: {
                type: DataTypes.NUMERIC,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM("activa", "inactiva", "vencida"),
                allowNull: false,
                defaultValue: "activa",
            },
        },
        {
            paranoid: true,
        }
    );
};

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
            due_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM("activa", "inactiva", "vencida"),
                allowNull: false,
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
        },
        {
            paranoid: true,
        }
    );
};

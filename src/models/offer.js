const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    sequelize.define(
        "offer",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "users",
                    key: "email",
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            contact: {
                type: DataTypes.NUMERIC,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
            },
            type: {
                type: DataTypes.ENUM("compra", "venta", "se busca"),
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
        },
        {
            paranoid: true,
        }
    );
};

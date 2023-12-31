const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "pack",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
            },
            original_total: {
                type: DataTypes.NUMERIC,
                allowNull: false,
            },
            final_total: {
                type: DataTypes.NUMERIC,
                allowNull: false,
            },
            discount: {
                type: DataTypes.NUMERIC,
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            service_set_identifier: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true,
            },
        },
        {
            paranoid: true,
        }
    );
};

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
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            final_total: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            discount: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            paranoid: true,
        }
    );
};

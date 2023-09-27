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
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
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
        },
        {
            paranoid: true,
        }
    );
};

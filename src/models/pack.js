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
            original_total: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            final_total: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            discount: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            paranoid: true,
        }
    );
};

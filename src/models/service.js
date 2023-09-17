const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "service",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            provider: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.ENUM(
                    "available",
                    "discontinued",
                    "unavailable"
                ),
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
            timestamps: true,
            underscored: true,
            tableName: "services",
        }
    );
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "packSubscription",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            due_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            pack_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            service_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_pack_pair: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            paranoid: true,
        }
    );
};

const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("membership", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("active", "inactive", "overdue"),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
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
    });
};
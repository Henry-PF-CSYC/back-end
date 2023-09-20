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
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            image: {
                //todo: handle based on how firebase works
                type: DataTypes.STRING,
            },
            type: {
                type: DataTypes.ENUM("compra", "venta", "laboral"),
                allowNull: false,
            },
            price:{
                type: DataTypes.INTEGER,
                allowNull: false
                
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
            tableName: "offers",
        }
    );
};

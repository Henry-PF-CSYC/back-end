const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        "user",
        {
            email: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            dni: {
                type: DataTypes.INTEGER,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                //TODO: encriptar
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
            role: {
                type: DataTypes.ENUM("user", "admin"),
                defaultValue: "user",
            },
            image: {
                //TODO: handle based on how firebase works
                type: DataTypes.STRING,
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
            tableName: "users",
        }
    );
};

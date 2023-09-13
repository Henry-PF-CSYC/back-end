const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define(
        "user",
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
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

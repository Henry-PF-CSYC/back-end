require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_URL,SSL_ENABLED } = process.env;
const ssl = SSL_ENABLED === "true";
const sequelize = new Sequelize(
    `${DB_URL}`,
    {
        logging: false, // set to console.log to see the raw SQL queries
        native: false, // lets Sequelize know we can use pg-native for ~30% more speed
        dialectOptions: {
            supportBigNumbers: true,
            ssl: ssl, // disable SSL
        }, 
    }, 
);

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners

fs.readdirSync(path.join(__dirname, "/models"))
    .filter(
        (file) =>
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
    )
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, "/models", file)));
    });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);

let capsEntries = entries.map((entry) => [
    entry[0][0].toUpperCase() + entry[0].slice(1),
    entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Service, Category, User, Review, Subscription, Offer, Pack, Notice } =
    sequelize.models; //admins,subscriptions,models,reviews,services,users
// Aca vendrian las relaciones
// Product.hasMany(Reviews);

User.hasMany(Subscription, { foreignKey: "user_id" });
Subscription.belongsTo(User, { foreignKey: "user_id" });
Service.hasMany(Subscription, { foreignKey: "service_id" });
Subscription.belongsTo(Service, { foreignKey: "service_id" });

Pack.belongsToMany(Service, { through: "pack_service" });
Service.belongsToMany(Pack, { through: "pack_service" });

User.hasMany(Review, { foreignKey: "user_id" });
Review.belongsTo(User, { foreignKey: "user_id" });
Service.hasMany(Review, { foreignKey: "service_id" });
Review.belongsTo(Service, { foreignKey: "service_id" });

User.hasMany(Offer, { foreignKey: "user_id" });
Offer.belongsTo(User, { foreignKey: "user_id" });

Service.belongsToMany(Category, { through: "service_category" });
Category.belongsToMany(Service, { through: "service_category" });

module.exports = {
    ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
    conn: sequelize, // para importart la conexión { conn } = require('./db.js');
    Op,
};

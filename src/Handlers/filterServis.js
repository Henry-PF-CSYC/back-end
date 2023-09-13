const { Service} = require('../db');
const filterProducts = async (req, res) => {
    //Desestruturamos estos valores
    const {
        servis,
        minPrice,
        maxPrice
    } = req.query;

    //Crea este objeto vacio que se utilizara para construir las condiciones de filtrado para la consulta a la base de datos
    let whereCondition = {};

    //Si brandname esta en los parámetros de la consulta agrega la condicion a wherecondition para filtrar por marca
    if (servis) {
        whereCondition = {
            ...whereCondition,
            productbrand: servis
        };
    }

    //Verifica si minPrice y maxPrice estan en los parametros de busqueda
    if (minPrice && maxPrice) {
        whereCondition = {
            //agrega una condición al objeto whereCondition para filtrar por el rango de precios del producto utilizando el operador Op.between proporcionado por Sequelize
            ...whereCondition,
            price: {
                [Op.between]: [parseInt(minPrice), parseInt(maxPrice)],
            },
        };
    }
    
    try {
        const servicios = await Service.findAll({ where: whereCondition });
    
        if (servicios.length > 0) {
          return res.status(200).json(servicios);
        } else {
          return res.json([]);
        }
      } catch (error) {
        return res.status(400).json({ error: 'Error al obtener los productos.' });
      }
}
module.exports = {filterProducts};

const {filterServices, filterServicesByPriceRanges} = require('../Controllers/filterControllers')

const filterservice = async(req, res) =>{
    const { service, minPrice, maxPrice } = req.query;
    
    try {
        const servicios = await filterServices(service, minPrice, maxPrice);
        
        if (servicios.length > 0) {
            res.status(200).json(servicios);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const filterServiceByPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    try {
        const servicios = await filterServicesByPriceRanges(minPrice, maxPrice);

        if (servicios.length > 0) {
            res.json(servicios);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {
    filterservice,
    filterServiceByPriceRange
};
// En resumen, este bloque de código crea una función que acepta solicitudes HTTP, filtra servicios en una base de datos según los criterios proporcionados en los parámetros de consulta y responde con los productos que cumplen con esos criterios o un arreglo vacío si no se encuentran coincidencias. También maneja errores en caso de que ocurran problemas durante la búsqueda en la base de datos.







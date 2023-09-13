
const {filterServices} = require('../Controllers/filterControllers')

const filterServis = async(req, res) =>{
    const { servis, minPrice, maxPrice } = req.query;
    
    try {
        const servicios = await filterServices(servis, minPrice, maxPrice);
        
        if (servicios.length > 0) {
            res.status(200).json(servicios);
        } else {
            res.json([]);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
module.exports = {filterServis};
// En resumen, este bloque de código crea una función que acepta solicitudes HTTP, filtra servicios en una base de datos según los criterios proporcionados en los parámetros de consulta y responde con los productos que cumplen con esos criterios o un arreglo vacío si no se encuentran coincidencias. También maneja errores en caso de que ocurran problemas durante la búsqueda en la base de datos.








const successfulPayment = (req, res) => {
    // Recuperar la información de la consulta (query) de la URL
    const info = req.query;
    
    // Convertir la información en formato JSON a una cadena
    const infoJSON = JSON.stringify(info);
  
    // Redirigir con una respuesta exitosa (código 200)
    // Aquí se realiza una redirección a una URL específica con los datos como parámetro
    res
      .status(200)
      .redirect(`http://localhost:5173/?data=${encodeURIComponent(infoJSON)}`);
  };
  
  // Exportar la función para que pueda ser utilizada en otros lugares del código
  module.exports = successfulPayment;
  
const mercadopago = require('mercadopago')
require('dotenv').config()
const { ACCESS_TOKEN } = process.env

//Configuración de las credenciales de acceso a la API de Mercado Pago
mercadopago.configure({
  access_token: ACCESS_TOKEN,
})

// Definición de la función asincrónica que maneja la creación de la orden de compra
const placeOrder = async (req, res) => {
  try {
    // Obtención de los datos del formulario
    const { id, name, description, image, stock, condition, price, quantity } = req.body
    // Creación de la orden de compra
    let preference = {
      		items: [
      			{
              id: id,
      				title: name,
              image: image,
      				unit_price: price,
      				quantity: quantity,
              description: description,
              currency_id: "ARS"
      			}
      		],
      // URLs de redirección después del pago (éxito, fallo y pendiente)
      back_urls: {
        success: 'https://front-trendy-app.vercel.app/confirmation', // URL en caso de éxito
        failure: 'https://front-trendy-app.vercel.app', // URL en caso de fallo
        pending: 'https://front-trendy-app.vercel.app' // URL en caso de pendiente
      }
      //*Forma que aparece en la api de mercado pago
      // auto_return "approved"
    };

    // Creación de la preferencia de pago en Mercado Pago
    const response = await mercadopago.preferences.create(preference)

    //* Forma que esta en la api de mercado pago 
    // mercadopago.preferences.create(preference)
    // .then(funcition (response) {
    //   res.json({
    //     id: response.body.id
    //   })
    // })
    console.log(response);
    //Respuesta exitosa con la preferencia creada
    res.status(200).json({ response })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

module.exports = placeOrder

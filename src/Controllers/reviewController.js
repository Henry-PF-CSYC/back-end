const { Review } = require('../db');

// Controlador para obtener revisiones por ID de servicio
const getReviewsByServiceId = async (req, res) => {
  const serviceId = req.params.serviceId;

  try {
    // Busca las revisiones asociadas al servicio por su ID
    const reviews = await Review.findAll({
      where: { serviceId },
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener revisiones por ID de usuario
const getReviewsByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Busca las revisiones asociadas al usuario por su ID
    const reviews = await Review.findAll({
      where: { userId },
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getReviewsByServiceId,
  getReviewsByUserId,
};

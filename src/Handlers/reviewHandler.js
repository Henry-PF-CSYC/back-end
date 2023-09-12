const { getReviewsByServiceId } = require('../Controllers/reviewController');

// Manejador para la ruta GET /reviewsByServiceId
const handleGetReviewsByServiceId = async (req, res) => {
  try {
    await getReviewsByServiceId(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  handleGetReviewsByServiceId,
};

const { Review, Subscription } = require("../db");

// Crear una reseña
const handlePostReview = async (req, res) => {
  try {
    const { rating, comment, serviceId, user_email } = req.body;

    const subscription = await Subscription.findOne({
      where: {
        user_id: user_email,
        service_id: serviceId,
        status: "activa",
      },
    });

    if (!subscription) {
      return res.status(403).json({
        message:
          "No puedes dejar una reseña para este servicio ya que no estás suscrito o tu suscripción está inactiva.",
      });
    }

    const existingReview = await Review.findOne({
      where: {
        user_id: user_email,
        service_id: serviceId,
      },
    });

    if (existingReview) {
      return res.status(403).json({
        message: "Ya has dejado una reseña para este servicio anteriormente.",
      });
    }

    const review = await Review.create({
      rating,
      comment,
      user_id: user_email,
      service_id: serviceId,
      user_service_pair: `${user_email}-${serviceId}`,
    });

    return res.status(201).json(review);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.findAll();
    if (allReviews.length === 0) {
      return res.status(400).json({ error: "No se encontró ninguna reseña" });
    }
    return res.status(200).json(allReviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Manejador para la ruta GET /reviewsByServiceId

const handleGetReviewsByServiceId = async (req, res) => {
  const { serviceId } = req.params;

  try {
    // Busca las revisiones asociadas al servicio por su ID
    const reviews = await Review.findAll({
      where: { service_id: serviceId },
    });
    if (reviews.length === 0) {
      return res
        .status(400)
        .json({ error: "No se entontraron reseñas para este servicio" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servido y de la " });
  }
};

// Manejador para la ruta GET /reviewsByUserId
const handleGetReviewsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const reviewsByUser = await Review.findAll({
      where: { user_id: userId },
    });
    if (reviewsByUser.length === 0) {
      return res
        .status(200)
        .json({ error: "El usuario no escribió ninguna reseña" });
    }
    return res.status(200).json(reviewsByUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const handleReviewById = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await Review.findOne({
      where: { id: id },
    });
    if (!review) {
      return res.status(400).json({ error: "No se encontró la reseña" });
    }
    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Eliminar una reseña por su ID
const handleDeleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    

    // Buscar la reseña por su ID
    const review = await Review.findByPk(id);

    // Verificar si la reseña existe
    if (!review) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }

    // Eliminar la reseña de forma física
    await review.destroy({ force: true });

    return res.status(200).json({ message: "Reseña eliminada con exito" }); // 204 significa "No Content"
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al eliminar la reseña" });
  }
};

module.exports = {
  handleDeleteReview,
};

module.exports = {
  handleGetReviewsByServiceId,
  handleGetReviewsByUserId,
  handlePostReview,
  getAllReviews,
  handleReviewById,
  handleDeleteReview,
};

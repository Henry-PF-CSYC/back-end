
const {postServiceController} = require("../Controllers/serviceControllers")


const postServiceHandler = async (req, res) => {
  const { type, name, description, provider, price, image, status } = req.body;
  try {
    const newService = await postServiceController(
      type,
      name,
      description,
      provider,
      price,
      image,
      status
    );
    res.status(200).json(newService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { postServiceHandler };

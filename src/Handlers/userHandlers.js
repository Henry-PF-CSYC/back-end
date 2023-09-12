const {postUserControler} = require("../Controllers/userControllers");

const getAllUsers = async (req, res) => {
  const { name } = req.querry;
  try {
    const user = name ? await getUserByName(name) : await getAllUsers();
    if (user.length == 0) {
      return res
        .status(400)
        .json({ message: "El usuario solicitado no existe" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const creatUser = async (req, res) => {
  const { name, lastname, username, email, password, phone, address, status } =
    req.body;
  try {
    const newUsers = await postUserControler(
      name,
      lastname,
      username,
      email,
      password,
      phone,
      address,
      status
    );
    res.status(200).json(newUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { creatUser, getAllUsers };

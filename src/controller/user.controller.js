const { User } = require("../models");

const findAllUser = async (req, res) => {
  try {
    const userList = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).send(userList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const findDetailUser = async (req, res) => {
  const { id } = req.params;
  try {
    const detailUser = await User.findByPk(id);
    res.status(200).send(detailUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createUser = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  try {
    //c1
    // const newUser  = User.build({ name, email, password, phone, role });
    // await newUser.save();
    //c2
    const newUser = await User.create({ name, email, password, phone, role });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, password, phone, role } = req.body;
  try {
    await User.update(
      { name, password, phone, role },
      {
        where: {
          id,
        },
      }
    );
    const detailUser = await User.findByPk(id);
    res.status(200).send(detailUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;
  const detailUser = await User.findByPk(id);
  try {
    await User.destroy({
      where: {
        id,
      },
    });
    res.status(200).send(detailUser);
  } catch (error) {
    res.status(500).send(error);
  }
};
const uploadAvatar = (req, res) => {
  res.send("Upload Avatar");
};
module.exports = {
  findAllUser,
  findDetailUser,
  createUser,
  updateUser,
  removeUser,
  uploadAvatar,
};

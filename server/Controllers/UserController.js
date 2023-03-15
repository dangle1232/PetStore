const jwt = require("jsonwebtoken");
const brcypt = require("bcrypt");
const userModel = require("../Models/UserModel");
const getListUser = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).send(users);
  } catch (error) {
    //gui ma loi ve client de refresh token
  }
};
// logs error

const postUser = (req, res) => {
  //1 verify token
  try {
    //3 save database
    const { username, password, email, role } = req.body;
    userModel.create({
      username: username,
      password: brcypt.hashSync(password, 10),
      email: email,
      role: role,
    });
    //3 save data to user collection
    return res.status(200).send("create user sucess");
  } catch (error) {
    //gui ma loi ve client de refresh token
    // logs error
  }
  //2 only routes admin can ascess
};

const deleteUser = async (req, res) => {
  try {
    //4.delete user
    const userId = req.params.userId;

    await userModel.findByIdAndRemove(userId);
    //3 save data to user collection
    return res.status(200).send("delete user success");
  } catch (error) {
    //gui ma loi ve client de refresh token
    // logs error
  }
  //2 only routes admin can ascess
};

module.exports = {
  getListUser: getListUser,
  postUser: postUser,
  deleteUser: deleteUser,
};

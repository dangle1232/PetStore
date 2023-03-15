const userModel = require("../Models/UserModel");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    //get infor from client
    const { username, password, email } = req.body;
    //create data to database
    await userModel.create({
      username: username,
      password: brcypt.hashSync(password, 10),
      email: email,
      role: "regular",
    });
    return res.status(200).send("register user");
  } catch (error) {
    console.log = ("error", error);
  }
};
const login = async (req, res) => {
  //check email , password
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Invalid email or Password");
  }
  //check password
  const isPassvaild = brcypt.compareSync(req.body.password, user.password);
  if (!isPassvaild) {
    return res.status(400).send("Invalid email or Password");
  }

  const jwtToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.SECRET_JWT,
    {
      expiresIn: 3600,
    }
  );

  return res.status(200).send({
    accessToken: jwtToken,
  });
};

module.exports = {
  register: register,
  login: login,
};

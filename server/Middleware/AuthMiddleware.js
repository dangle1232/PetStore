const jwt = require("jsonwebtoken");
const userModel = require("../Models/UserModel");
//check authentication
const isAuthentication = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    const accessToken = bearerHeader.split(" ")[1];
    const decodeJwt = jwt.verify(accessToken, process.env.SECRET_JWT);
    //set user id to req object
    req.userId = decodeJwt.id;
    next(); //goi den 1 function tiep
  } catch (error) {
    //gui ma loi ve client de refresh token
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send("token expried");
    }
    return res.status(401).send("Authentication not valid");
  }
};
//check role admin
const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    //role is admin
    if (user.role === "admin") {
      next();
    }
  } catch (error) {
    return res.status(401).send("Authentication not validdd");
  }
};
module.exports = {
  isAuthentication: isAuthentication,
  isAdmin: isAdmin,
};

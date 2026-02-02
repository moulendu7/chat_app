const UserService = require("../service/user-service.js");

const Userservice = new UserService();

const signup = async function (req, res) {
  try {
    console.log(req.body);
    const response = await Userservice.signup({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    return res.status(201).json({
      success: true,
      message: "Successfully created a new user",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong/Cannot be Signedup",
      data: {},
      success: false,
      err: {error},
    });
  }
};
const signin = async function (req, res) {
  try {
    const response = await Userservice.signin(req.body);
    return res.status(200).json({
      success: true,
      token: response.token,
      user: response.user
    });
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message || "Login failed",
      err: error
    });
  }
};

module.exports = {
    signin,signup
}
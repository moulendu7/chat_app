const UserRepo = require("../repository/user-repo.js");

class UserService {
  constructor() {
    this.User_repo = new UserRepo();
  }

  async signup(data) {
    try {
      const user = await this.User_repo.create(data);
      return user;
    } catch (error) {
      throw error;
    }
  }
  async finduserbyemail(email) {
    try {
      const user = await this.User_repo.findBy({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }
  async signin(data) {
  try {
    const user = await this.finduserbyemail(data.email);

    if (!user) {
      throw { message: "No user found" };
    }

    if (!user.comparePassword(data.password)) {
      throw { message: "Incorrect password" };
    }

    const token = user.genJWT(); 

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    };
  } catch (error) {
    throw error;
  }
}
}
module.exports = UserService;
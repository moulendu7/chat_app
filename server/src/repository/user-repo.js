const User = require('../models/user.js')
// const { v4: uuid } = require("uuid");
class User_repo {
  constructor() {
    this.model = User;
  }

  async create(data) {
    try {
      // data.userid = uuid();
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo create",error);
      throw error;
    }
  }

  async destroy(id) {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo destroy");
      throw error;
    }
  }

  async get(id) {
    try {
      const result = await this.model.findById(id);
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo get");
      throw error;
    }
  }

  async getAll() {
    try {
      const result = await this.model.find({});
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo get all");
      throw error;
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo update");
      throw error;
    }
  }
  async findBy(filter) {
    try {
      const result = await this.model.findOne(filter);
      return result;
    } catch (error) {
      console.log("Something went wrong in crud repo findby");
      throw error;
    }
  }
}

module.exports = User_repo;

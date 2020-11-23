const Admin = require('../models/Admin')
const bcrypt = require("bcryptjs");
const { registrationValidation, loginValidation } = require("./validations/authValidation");

const register = async (req, res, next) => {
    const { error } = registrationValidation(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    }
  
    const emailExists = await Admin.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(400).send("Email already exists in the database");
    }
  
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      await bcrypt.genSalt(10)
    );
    const admin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
  
    try {
      const savedAdmin = await admin.save();
      res.send(savedAdmin);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  const login = async (req, res, next) => {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
  
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(400).send("Email is wrong");
    }
  
    const validPass = await bcrypt.compare(req.body.password, admin.password);
    if (!validPass) return res.status(400).send("Invalid Password");
  
    res.send("Admin has logged in");
  }

  module.exports = { register, login }
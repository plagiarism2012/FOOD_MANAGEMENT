const User = require("../models/user");
const Role = require("../models/role");

const checkDuplicate = async (req, res, next) => {
  try {
    const userByUsername = await User.findOne({ username: req.body.username }).exec();
    if (userByUsername) {
      return res.status(400).send({ message: "Failed! Username is already in use!" });
    }

    const userByEmail = await User.findOne({ email: req.body.email }).exec();
    if (userByEmail) {
      return res.status(400).send({ message: "Failed! Email is already in use!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const checkRolesExisted = async (req, res, next) => {
  try {
    if (req.body.roles) {
      const roles = await Role.find({ _id: { $in: req.body.roles } }).exec();
      const existingRoleIds = roles.map(role => role._id.toString());
      
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!existingRoleIds.includes(req.body.roles[i])) {
          return res.status(400).send({ message: `Failed! Role ${req.body.roles[i]} does not exist!` });
        }
      }
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const verifySignUp = {
  checkDuplicate,
  checkRolesExisted
};

module.exports = verifySignUp;

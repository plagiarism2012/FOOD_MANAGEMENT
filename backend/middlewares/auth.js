const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Role = require("../models/role");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    let secret = req.headers["x-access-signature"];
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    
    // Prints: true
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
};

isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
  
      const roles = await Role.find({ _id: { $in: user.roles } });
      const isAdmin = roles.some(role => role.name === "admin");
      
      if (isAdmin) {
        next();
      } else {
        res.status(403).send({ message: "Require Admin Role!" });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
};
  

const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;

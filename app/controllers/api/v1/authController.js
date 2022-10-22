const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Users } = require("../../../models");
const SALT = 10;

const authService = require("../../../services/authService")

function encryptPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, SALT, (err, encryptedPassword) => {
        if (!!err) {
          reject(err);
          return;
        }
  

        resolve(encryptedPassword);
      });
    });
  }
  

  function checkPassword(encryptedPassword, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
        if (!!err) {
          reject(err);
          return;
        }
  
        resolve(isPasswordCorrect);
      });
    });
  }

  function createToken(payload) {
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
  }

  async function authorize(req, res, next, role) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(
        token,
        process.env.JWT_SIGNATURE_KEY || "Rahasia"
      );

      const user = await Users.findByPk(tokenPayload.id);
      if(!role.includes(user.roles)){
        throw new Error("Unathourized");
      }

      req.user = user;
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({
        message: "Unauthorized",
      
      });
    }
  }
  
  module.exports = {
    async register(req, res) {

      if (!req.body.email || !req.body.password) {
        return res.status(422).json({
            status: "error",
            message: "Missing required fields"
        });
      } else {
        const email = req.body.email;
        const emailExist = await authService.findUser(email);

        if(emailExist) {
          res.status(409).json({
            status: "failed",
            message: "email alredy used"
          })
          return
        } else {
          const encryptedPassword = await encryptPassword(req.body.password);
          const roles = "member";

          authService
        .create({ email, encryptedPassword , roles})
        .then((user) => {
            res.status(201).json({
                status: "OK",
                message: "user created succesfully",
                data: {
                  id: user.id,
                email: user.email,
                roles: user.roles
                }
              });
        })
        .catch((err) => {
            res.status(500).json({
                status: "Error",
                message: err.message,
            });
        });

        }
      } 
              
    },

    async registerAdmin(req,res) {
      if (!req.body.email || !req.body.password) {
        return res.status(422).json({
            status: "error",
            message: "Missing required fields"
        });
      } else {
        const email = req.body.email;
        const emailExist = await authService.findUser(email);

        if(emailExist) {
          res.status(409).json({
            status: "failed",
            message: "email alredy used"
          })
          return
        } else {
          const encryptedPassword = await encryptPassword(req.body.password);
          const roles = "admin";

          authService
        .create({ email, encryptedPassword , roles})
        .then((user) => {
            res.status(201).json({
                status: "succes",
                message: " created admin succesfully",
                data: {
                  id: user.id,
                email: user.email,
                roles: user.roles
                }
              });
        })
        .catch((err) => {
            res.status(500).json({
                status: "Error",
                message: err.message,
            });
        });

        }
      } 

    },

  
    async login(req, res) {
      if (!req.body.email || !req.body.password) {
        res.status(422).json({
            status: "failed",
            message: "Missing fields required",
        });
    } else {
      const email = req.body.email.toLowerCase(); // Biar case insensitive
      const password = req.body.password;
      const user = await authService.findUser(email);

      if (!user) {
        res.status(401).json({ 
          status: "failed",
          message: "email is invalid" });
        return;
      }
  
      const isPasswordCorrect = await checkPassword(
        user.encryptedPassword,
        password
      );
  
      if (!isPasswordCorrect) {
        res.status(401).json({ 
          status: "failed",
          message: "Password is invalid" });
        return;
      }
  
      const token = createToken({
        id: user.id,
        email: user.email,
        role: user.roles,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
  
      res.status(201).json({
        status: "success",
        message: "login success",
        data: {
          id: user.id,
          email: user.email,
          role: user.roles,
          token,
        }
        
      });
      
    }
      
  
      
    },
  
    async whoAmI(req, res) {
      res.status(200).json({
        status: "success",
        message: "get usedata data successfully",
        data: {
          id: req.user.id,
          email: req.user.email,
          role: req.user.roles,
        }
      });
    },
  
    

    async authorizeMember(req, res, next) {
      authorize(req, res, next, ["member", "admin", "superadmin"]);
    },

    async authorizeAdmin(req, res, next) {
      authorize(req, res, next, ["admin", "superadmin"]);
    },

    async authorizeSuperAdmin(req, res, next) {
      authorize(req, res, next, ["superadmin"]);
    },

    async list(req,res) {
      authService
        .list()
        .then(({data, count}) => {
          res.status(200).json({
            status: "success",
            message: "get users data successfully",
            data: {user:data},
            meta: {total: count},
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: "FAIL",
            message : err.message,
          });
        });
    },
  };
  
  
  
  
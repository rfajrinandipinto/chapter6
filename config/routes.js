const express = require("express");
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDoc = YAML.load('./docs/openapi.yaml');
const controllers = require("../app/controllers");
const upload = require('multer')();

const apiRouter = express.Router();



apiRouter.use(['/', 'docs'], swaggerUi.serve);
apiRouter.get(['/', 'docs'], swaggerUi.setup(swaggerDoc));


/**
 * Authentication Resource
 * */
 apiRouter.get(
    "/api/v1/whoami",
    controllers.api.v1.authController.authorizeMember,
    controllers.api.v1.authController.whoAmI
  );
  
  apiRouter.post("/api/v1/login", upload.any(), controllers.api.v1.authController.login);
  apiRouter.post("/api/v1/register",upload.any(), controllers.api.v1.authController.register);
  apiRouter.get("/api/v1/users", 
    controllers.api.v1.authController.authorizeAdmin,
    controllers.api.v1.authController.list);
  apiRouter.post("/api/v1/registerAdmin",  upload.any(),
    controllers.api.v1.authController.authorizeSuperAdmin,
    controllers.api.v1.authController.registerAdmin);
  

/**
 * TODO: Implement your own API
 *       implementations
 */
apiRouter.get("/api/v1/cars",
  controllers.api.v1.authController.authorizeMember,
  controllers.api.v1.carController.list);
apiRouter.post("/api/v1/cars",  upload.any(),
  controllers.api.v1.authController.authorizeAdmin,
  controllers.api.v1.carController.create);
apiRouter.put("/api/v1/cars/:id",  upload.any(),
  controllers.api.v1.authController.authorizeAdmin,
  controllers.api.v1.carController.update);
apiRouter.get("/api/v1/cars/:id", 
controllers.api.v1.authController.authorizeMember,
  controllers.api.v1.carController.show);
apiRouter.delete("/api/v1/cars/:id",
  controllers.api.v1.authController.authorizeAdmin,
  controllers.api.v1.carController.destroy
);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;

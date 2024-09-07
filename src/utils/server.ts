import express from "express";
import routes from "../routes";
import deserializeUser from "../middleware/deserializeUser";
import { createUserController } from "../controller/user.controller";
import { createSessionController } from "../controller/session.controller";
import { createProductController } from "../controller/product.controller";

function createServer(
  userController = createUserController(),
  sessionController = createSessionController(),
  productController = createProductController()
) {

  const app = express();
  app.use(express.json());
  app.use(deserializeUser());

  routes(app, userController, sessionController, productController);

  return app;
}

export default createServer;
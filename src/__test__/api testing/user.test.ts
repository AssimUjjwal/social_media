import request from "supertest";
import createServer from "../../utils/server";
import { createUserRepository } from "../__mocks__/user.repository";
import { createSessionRepository } from "../__mocks__/session.repository";
import { createProductRepository } from "../__mocks__/product.repository";
import { createUserService } from "../../service/user.service";
import { createSessionService } from "../../service/session.service";
import { createProductService } from "../../service/product.service";
import { createUserController } from "../../controller/user.controller";
import { createSessionController } from "../../controller/session.controller";
import { createProductController } from "../../controller/product.controller";

function createApp() {
  const userRepository = createUserRepository();
  const sessionRepository = createSessionRepository();
  const productRepository = createProductRepository();

  const userService = createUserService(userRepository);
  const sessionService = createSessionService(sessionRepository, userService);
  const productService = createProductService(productRepository);

  const userController = createUserController(userService);
  const sessionController = createSessionController(sessionService, userService);
  const productController = createProductController(productService);

  const app = createServer(userController, sessionController, productController);
  return { app, userRepository, sessionRepository, productRepository }
}


describe("User Registration", () => {
  describe("given the username and password are valid", () => {
    it("should return the user payload", async () => {

      const mockInput = {
        email: "test@example.com",
        name: "test",
        password: "123456",
        passwordConfirmation: "123456",
      };
      const mockValue = {
        email: "test@example.com",
        name: "test",
        password: "123456",
      };
      const mockOutput = {
        email: "test@example.com",
        name: "test",
      };
      

      const { app, userRepository } = createApp();
      const res = await request(app)
        .post("/api/users")
        .send(mockInput);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(mockOutput);
      expect(userRepository.createUser).toHaveBeenCalledWith(mockValue);
    });
  });

  describe("given the confirm passwords do not match", () => {
    it("should return a 400", async () => {
    
      const mockInput = {
        email: "test@example.com",
        name: "test",
        password: "123456",
        passwordConfirmation: "asdfdsfhfdgh",
      };
    
      const { app, userRepository } = createApp();
      const res = await request(app)
        .post("/api/users")
        .send(mockInput);

      expect(res.statusCode).toBe(400);
      expect(userRepository.createUser).not.toHaveBeenCalled();
    });
  });

  describe("given the user service throws", () => {
    it("should return a 409 error", async () => {

      const mockInput = {
        email: "test@example.com",
        name: "test",
        password: "123456",
        passwordConfirmation: "123456",
      };
      
      const { app, userRepository } = createApp();

      const userRepositoryMock = jest
          .spyOn(userRepository, "createUser")
          .mockRejectedValueOnce("Oh no! :(");

      const res = await request(app)
        .post("/api/users")
        .send(mockInput);

      expect(res.statusCode).toBe(409);
      expect(userRepository.createUser).toHaveBeenCalled();
    });
  });
});

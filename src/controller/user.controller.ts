import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from "../schema/user.schema";
import { createUserService } from "../service/user.service";
import logger from "../utils/logger";

export const createUserController = (
  userService = createUserService()
) => ({

  createUserHandler: async (req: Request<{}, {}, CreateUserInput["body"]>, res: Response) => {
    try {
      const user = await userService.createUserService(omit(req.body, "passwordConfirmation"));
      return res.send(user);
    } catch (e: any) {
      return res.status(409).send(e.message);
    }
  },
});
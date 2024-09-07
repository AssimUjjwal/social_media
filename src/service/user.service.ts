import { omit } from "lodash";

import { CreateUserInput } from "../schema/user.schema";
import { CreateSessionInput } from "../schema/session.schema";
import { createUserRepository } from "../repository/user.repository";

export const createUserService = (
  userRepository = createUserRepository()
) => ({

  createUserService: async (
    input: Omit<CreateUserInput["body"], "passwordConfirmation">
  ) => {
    try {
      const user = await userRepository.createUser(input);
      return omit(user.toJSON(), "password");
    } catch (e: any) {
      throw new Error(e);
    }
  },

  validatePasswordService: async (
    { email, password }: CreateSessionInput["body"]
  ) => {
    const user = await userRepository.findUser({ email });
    if (!user) return null;

    const isValid = await userRepository.comparePassword(user, password);
    if (!isValid) return null;

    return omit(user.toJSON(), "password");
  },

  findUserService: async (query: any) => {
    return userRepository.findUser(query);
  },
});
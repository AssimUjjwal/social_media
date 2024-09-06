// user.service.ts
import { omit } from "lodash";
import { createUser, findUser, comparePassword } from "../repository/user.repository";
import { CreateUserInput } from "../schema/user.schema";
import { CreateSessionInput } from "../schema/session.schema";

export async function createUserService(
  input: Omit<CreateUserInput["body"], "passwordConfirmation">
) {
  try {
    const user = await createUser(input);
    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePasswordService(
  { email, password }: CreateSessionInput["body"]
) {
  const user = await findUser({ email });
  if (!user) return null;

  const isValid = await comparePassword(user, password);
  if (!isValid) return null;

  return omit(user.toJSON(), "password");
}

export async function findUserService(query: any) {
  return findUser(query);
}

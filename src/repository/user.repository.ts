import { FilterQuery } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export async function createUser(input: any) {
  return UserModel.create(input);
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

export async function comparePassword(user: UserDocument, password: string) {
  return user.comparePassword(password);
}

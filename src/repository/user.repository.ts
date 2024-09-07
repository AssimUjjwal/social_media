import { FilterQuery, Model } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export const createUserRepository = (
    UserModelProto: Model<UserDocument> = UserModel
) => ({

  createUser: async (input: any) => {
    return UserModelProto.create(input);
  },

  findUser: async (query: FilterQuery<UserDocument>) => {
    return UserModelProto.findOne(query);
  },

  comparePassword: async (user: UserDocument, password: string) => {
    return user.comparePassword(password);
  },
});
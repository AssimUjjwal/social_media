import { FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument } from "../models/user.model";
import { CreateUserInput } from "../schema/user.schema";
import { CreateSessionInput } from "../schema/session.schema";

export async function createUser(
    input: Omit<CreateUserInput["body"], "passwordConfirmation">
) {
    try {
        const user = await UserModel.create(input);
        return omit(user.toJSON(), "password");
    } catch (e: any) {
        throw new Error(e);
    }
}

export async function validatePassword(
    { email, password }: CreateSessionInput["body"]
) {
    const query: FilterQuery<UserDocument> = { email };
    const user = await UserModel.findOne(query);
    if (!user) return null;

    const isValid = await user.comparePassword(password);
    if (!isValid) return null;

    return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
    return UserModel.findOne(query).lean();
}
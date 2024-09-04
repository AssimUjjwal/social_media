import { get } from "lodash";
import config from "config";
import mongoose, { FilterQuery, RootFilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export async function createSession(userId: mongoose.Types.ObjectId, userAgent: string) {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
}

export async function findSessions(query: RootFilterQuery<SessionDocument>) {
    return SessionModel.find(query).lean();
}

export async function updateSession(
    query: RootFilterQuery<SessionDocument>,
    update: UpdateQuery<SessionDocument>
) {
    return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken(
    { refreshToken }: { refreshToken: string }
) {
    const { decoded } = verifyJwt(refreshToken);
    if (!decoded || !get(decoded, "session")) return null;

    const session = await SessionModel.findById(get(decoded, "session"));
    if (!session || !session.valid) return null;

    const user = await findUser({ _id: session.user });
    if (!user) return null;

    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );

    return accessToken;
}
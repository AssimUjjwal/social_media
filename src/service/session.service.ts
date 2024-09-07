import { get } from "lodash";
import config from "config";

import {  createSessionRepository } from "../repository/session.repository";
import { createUserService } from "./user.service";
import { verifyJwt, signJwt } from "../utils/jwt.utils";

export const createSessionService = (
    sessionRepository = createSessionRepository(), 
    userService = createUserService()
) => ({

    createSessionService: async function (userId: any, userAgent: string) {
        const session = await sessionRepository.createSession(userId, userAgent);
        return session.toJSON();
    },

    findSessionsService: async function (query: any) {
        return sessionRepository.findSessions(query);
    },

    updateSessionService: async function (query: any, update: any) {
        return sessionRepository.updateSession(query, update);
    },

    reIssueAccessTokenService: async function (
        { refreshToken }: { refreshToken: string }
    ) {
        const { decoded } =  verifyJwt(refreshToken);
        if (!decoded || !get(decoded, "session")) return null;

        const session = await sessionRepository.findSessionById(get(decoded, "session"));
        if (!session || !session.valid) return null;

        const user = await userService.findUserService({ _id: session.user });
        if (!user) return null;

        const accessToken = signJwt(
            { ...user, session: session._id },
            { expiresIn: config.get("accessTokenTtl") }
        );

        return accessToken;
    }
})
// session.service.ts
import { get } from "lodash";
import { createSession, findSessions, updateSession, findSessionById } from "../repository/session.repository";
import { verifyJwt, signJwt } from "../utils/jwt.utils";
import { findUserService } from "./user.service";
import config from "config";

export async function createSessionService(userId: any, userAgent: string) {
  const session = await createSession(userId, userAgent);
  return session.toJSON();
}

export async function findSessionsService(query: any) {
  return findSessions(query);
}

export async function updateSessionService(query: any, update: any) {
  return updateSession(query, update);
}

export async function reIssueAccessTokenService(
  { refreshToken }: { refreshToken: string }
) {
  const { decoded } = verifyJwt(refreshToken);
  if (!decoded || !get(decoded, "session")) return null;

  const session = await findSessionById(get(decoded, "session"));
  if (!session || !session.valid) return null;

  const user = await findUserService({ _id: session.user });
  if (!user) return null;

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get("accessTokenTtl") }
  );

  return accessToken;
}
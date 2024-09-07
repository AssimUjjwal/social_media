import { Request, Response } from "express";
import config from "config";

import { createSessionService } from "../service/session.service";
import { createUserService } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export const createSessionController = (
  sessionService = createSessionService(),
  userService = createUserService()
) => ({

  createUserSessionHandler: async function (req: Request, res: Response) {
    const user = await userService.validatePasswordService(req.body);

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    const session = await sessionService.createSessionService(user._id, req.get("user-agent") || "");

    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenTtl") } // 15 minutes
    );
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("refreshTokenTtl") } // 15 minutes
    );

    return res.send({ user, accessToken, refreshToken });
  },

  getUserSessionsHandler: async function (req: Request, res: Response) {
    const userId = res.locals.user._id;
    const sessions = await sessionService.findSessionsService({ user: userId, valid: true });

    return res.send(sessions);
  },

  deleteSessionHandler: async function (req: Request, res: Response) {
    const sessionId = res.locals.user.session;
    await sessionService.updateSessionService({ _id: sessionId }, { valid: false });

    return res.send({
      accessToken: null,
      refreshToken: null,
    });
  }
})
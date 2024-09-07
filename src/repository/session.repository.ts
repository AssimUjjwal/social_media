import { FilterQuery, Model, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";

export const createSessionRepository = (
    SessionModelProto: Model<SessionDocument> = SessionModel
) => ({
    createSession: async function (userId: any, userAgent: string) {
        return SessionModelProto.create({ user: userId, userAgent });
    },

    findSessions: async function (query: FilterQuery<SessionDocument>) {
        return SessionModelProto.find(query).lean();
    },

    updateSession: async function (
        query: FilterQuery<SessionDocument>,
        update: UpdateQuery<SessionDocument>
    ) {
        return SessionModelProto.updateOne(query, update);
    },

    findSessionById: async function (sessionId: string) {
        return SessionModelProto.findById(sessionId).lean();
    }
})
export const createSessionRepository = () => ({
    createSession: jest.fn().mockResolvedValue({
        _id: "sessionId",
        user: "userId",
        userAgent: "Mozilla/5.0",
        toJSON: () => ({
            _id: "sessionId",
            user: "userId",
            userAgent: "Mozilla/5.0",
        }),
    }),

    findSessions: jest.fn().mockResolvedValue([
        {
            _id: "sessionId1",
            user: "userId1",
            userAgent: "Mozilla/5.0",
        },
        {
            _id: "sessionId2",
            user: "userId2",
            userAgent: "Chrome/91.0",
        },
    ]),

    updateSession: jest.fn().mockResolvedValue({
        modifiedCount: 1,
    }),

    findSessionById: jest.fn().mockResolvedValue({
        _id: "sessionId",
        user: "userId",
        userAgent: "Mozilla/5.0",
    }),
});

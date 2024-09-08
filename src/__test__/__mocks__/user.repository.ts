export const createUserRepository = () => ({
  createUser: jest.fn().mockResolvedValue({
    toJSON: () => ({ email: "test@example.com", name: "test", password: "hashedPassword" }),
  }),
  findUser: jest.fn().mockResolvedValue({
    _id: "userId",
    email: "test@example.com",
    name: "test",
    password: "hashedPassword",
    toJSON: () => ({ email: "test@example.com", password: "hashedPassword", name: "test" }),
    comparePassword: jest.fn().mockResolvedValue(true),
  }),
  comparePassword: jest.fn().mockResolvedValue(true),
});
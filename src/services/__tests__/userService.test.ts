import { createUserService } from "../userService";
import { ApiClient } from "../../client/types";

describe("userService", () => {
  let mockApiClient: jest.Mocked<ApiClient>;
  let userService: ReturnType<typeof createUserService>;

  beforeEach(() => {
    mockApiClient = {
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };
    userService = createUserService(mockApiClient);
  });

  test("should fetch a user by ID", async () => {
    const userData = { id: "1", name: "John Paul" };
    mockApiClient.get.mockResolvedValue(userData);

    const result = await userService.getUser("1");
    expect(mockApiClient.get).toHaveBeenCalledWith("/api/1/users/1");
    expect(result).toEqual(userData);
  });

  test("should create a new user", async () => {
    const newUser = { name: "Jane Dan", email: "jane@example.com" };
    const createdUser = { ...newUser };
    mockApiClient.post.mockResolvedValue(newUser);

    const result = await userService.createUser(newUser);

    expect(mockApiClient.post).toHaveBeenCalledWith("/api/1/users/", newUser);
    expect(result).toMatchObject(createdUser);
  });

  test("should update a user", async () => {
    const updatedUser = { name: "John Smith", email: "john@example.com" };
    mockApiClient.put.mockResolvedValue({ id: "1", ...updatedUser });

    const result = await userService.updateUser("1", updatedUser);
    expect(mockApiClient.put).toHaveBeenCalledWith(
      "/api/1/users/1",
      updatedUser
    );
    expect(result).toEqual({ id: "1", ...updatedUser });
  });

  test("should delete a user by ID", async () => {
    mockApiClient.delete.mockResolvedValue(undefined);

    await userService.deleteUser("1");
    expect(mockApiClient.delete).toHaveBeenCalledWith("/api/1/users/1");
  });

  test("should handle errors in fetching user", async () => {
    mockApiClient.get.mockRejectedValue(new Error("API Error"));

    await expect(userService.getUser("1")).rejects.toThrow("API Error");
  });
});

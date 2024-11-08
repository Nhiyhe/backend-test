import { createApiClient } from "./client/apiClient";
import { createUserService } from "./services/userService";
import { createParcService } from "./services/parcService";

async function main() {
  const apiClient = createApiClient("http://localhost:3001");
  const userService = createUserService(apiClient);
  const parcService = createParcService(apiClient);

  // try {
  //   const parcs = await parcService.getAll();
  //   console.log("Parcs:", parcs);
  // } catch (error) {
  //   console.error("Error fetching parcs:", error);
  // }

  //userId//db81e169-69f9-4850-8fe5-a0753f8763e7

  try {
    const user = await userService.getUser(
      "db81e169-69f9-4850-8fe5-a0753f8763e7"
    );
    console.log("Getting user:", user);
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  // try {
  //   const users = await userService.getAll();
  //   console.log("Getting all users:", users);
  // } catch (error) {
  //   console.error("Error fetching users:", error);
  // }
}

main();

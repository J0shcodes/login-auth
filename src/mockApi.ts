import { FormData, ApiResponse } from "./interface";

export const mockLoginApi = async (data: FormData): Promise<ApiResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        data.email === "test@example.com" &&
        data.password !== "password124"
      ) {
        reject(new Error("Invalid email or password"));
      } else {
        resolve({
          success: true,
          user: {
            id: "123",
            email: data.email,
            name: "Demo User",
          },
          token: "mock-jwt-token",
        });
      }
    }, 1500);
  });
};

// lib/api.ts
import { instance } from "./apiInstance"; // Your axios instance
import { toast } from "@/hooks/use-toast"; // Your toast utility

type ApiHandlerOptions<T> = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: T;
  successMessage?: string;
  skipErrorToast?: boolean;
};

export async function apiHandler<T = any, R = any>({
  method,
  url,
  data,
  successMessage,
  skipErrorToast = false,
}: ApiHandlerOptions<T>): Promise<R | undefined> {
  try {
    const response = await instance({ method, url, data });
    // console.log(response.headers["set-cookie"]);

    if (successMessage) {
      toast({
        title: "Success",
        description: successMessage,
        variant: "default",
      });
    }

    return response.data;
  } catch (error: any) {
    if (!skipErrorToast) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    }
    // throw error; // Re-throw error for component-level handling if needed
  }
}

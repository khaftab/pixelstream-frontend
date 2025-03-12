"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiHandler } from "@/lib/api";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email: string;
  isAllowed: boolean;
};

type AuthContextType = {
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
  serverUser,
}: {
  children: React.ReactNode;
  serverUser: User | null;
}) {
  const [user, setUser] = useState<User | null>(serverUser);
  const router = useRouter();
  // check if user is authenticated on the client side. (optional)

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     console.log("checking auth");
  //     try {
  //       const currentUser = await apiHandler({
  //         method: "GET",
  //         url: "/api/users/me",
  //         skipErrorToast: true,
  //       });
  //       setUser(currentUser);
  //     } catch (error) {
  //       setUser(null);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   checkAuth();
  // }, []);

  const signUp = async (email: string, password: string) => {
    const signedUpUser = await apiHandler({
      method: "POST",
      url: "/api/users/signup",
      data: { email, password },
      successMessage: "Account created successfully!",
    });
    if (signedUpUser) {
      setUser(signedUpUser);
      router.push("/dashboard");
    } else {
      setUser(null);
    }
  };

  const signIn = async (email: string, password: string) => {
    const signedInUser = await apiHandler({
      method: "POST",
      url: "/api/users/signin",
      data: { email, password },
      successMessage: "Logged in successfully!",
    });
    if (signedInUser) {
      setUser(signedInUser);
      router.push("/dashboard");
    } else {
      setUser(null);
    }
  };

  const signOut = async () => {
    const data = await apiHandler({
      method: "GET",
      url: "/api/users/signout",
      successMessage: "Logged out successfully!",
    });
    if (data) {
      setUser(null);
      router.push("/signin");
    }
  };
  // we can move the auth call to where it needs. Then, we have to set the user state to the response data.
  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

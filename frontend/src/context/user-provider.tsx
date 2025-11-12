"use client";

import { api } from "@/utils/axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type UserContextType = {
  user: IUser | null;
  loading: boolean;
  submitting: boolean;
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string, avatar?: File) => Promise<void>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

function UserProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    getLoggedInUser();
  }, []);

  const login = async (username: string, password: string) => {
    setSubmitting(true);
    try {
      await api.post("/api/auth/login", { username, password });
      await getLoggedInUser();
      router.push("/");
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const signup = async (username: string, password: string, avatar?: File) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      if (avatar) formData.append("avatar", avatar);

      await api.post("/api/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await getLoggedInUser();
      router.push("/");
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  const getLoggedInUser = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await api.get<IUser>("/api/auth/get-user");
      setUser(res.data);
    } catch (err) {
      console.error(err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, loading, submitting, login, signup, logout }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const state = useContext(UserContext);
  if (!state) throw new Error("useUser must be used within UserProvider");
  return state;
}

export { UserProvider, useUser };

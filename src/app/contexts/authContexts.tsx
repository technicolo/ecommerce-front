"use client";

import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import Cookies from "js-cookie";

type AuthTokens = {
  token: string;
  refresh_token?: string;
};

const AUTH_TOKENS_KEY = "NEXT_JS_AUTH";

type AuthContextType = {
  login: (tokens: AuthTokens) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica la cookie en el primer render
  useEffect(() => {
    const cookie = Cookies.get(AUTH_TOKENS_KEY);
    if (cookie) {
      try {
        const { token } = JSON.parse(cookie);
        setIsAuthenticated(!!token);
      } catch {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = useCallback((tokens: AuthTokens) => {
    Cookies.set(AUTH_TOKENS_KEY, JSON.stringify(tokens), { expires: 1 });
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove(AUTH_TOKENS_KEY);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
    }),
    [login, logout, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}

// Para usar desde Axios u otras partes
export function getAuthToken(): string | undefined {
  const cookie = Cookies.get(AUTH_TOKENS_KEY);
  if (!cookie) return;
  try {
    const { token } = JSON.parse(cookie);
    return token;
  } catch {
    return;
  }
}

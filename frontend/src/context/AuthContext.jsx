import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeJwtPayload = (token) => {
    try {
      const payloadPart = token.split(".")[1];
      if (!payloadPart) return null;

      // JWT payload is base64url-encoded.
      const base64 = payloadPart.replace(/-/g, "+").replace(/_/g, "/");
      const padded =
        base64 + "=".repeat((4 - (base64.length % 4)) % 4);

      // Prefer TextDecoder (works reliably for UTF-8 JSON).
      try {
        const binary = atob(padded);
        const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
        const jsonStr = new TextDecoder().decode(bytes);
        return JSON.parse(jsonStr);
      } catch {
        // Fallback for older environments.
        const jsonStr = decodeURIComponent(escape(atob(padded)));
        return JSON.parse(jsonStr);
      }
    } catch {
      return null;
    }
  };

  // 🔁 Auto-login from JWT
  useEffect(() => {
    const url = new URL(window.location.href);
    const redirectedToken = url.searchParams.get("token");
    const authError = url.searchParams.get("auth_error");

    if (redirectedToken || authError) {
      url.searchParams.delete("token");
      url.searchParams.delete("auth_error");
      window.history.replaceState({}, document.title, url.toString());
    }

    if (authError) {
      console.error("Google login failed", authError);
    }

    if (redirectedToken) {
      localStorage.setItem("token", redirectedToken);
    }

    const token = redirectedToken || localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    // 1) Try decoding instantly so UI updates right away.
    const decodedUser = decodeJwtPayload(token);
    if (decodedUser) setUser(decodedUser);

    // 2) Confirm with backend (Mongo doc) to be 100% sure.
    //    This also lets us return history/subscription fields.
    (async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        // If backend isn't reachable, keep decodedUser (if any).
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

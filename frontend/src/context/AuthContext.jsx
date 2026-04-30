import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    name: "Guest User",
    email: "guest@example.com",
    picture: "https://www.figma.com/api/mcp/asset/d71d00d6-ab7c-4fe1-b4eb-3370ca93bd6e"
  });

  const login = () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ user, login, logout, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

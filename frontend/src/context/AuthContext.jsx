import { createContext, useContext } from "react";
import { useUser, useClerk } from "@clerk/clerk-react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { openSignIn, signOut } = useClerk();

  const authUser = isSignedIn ? {
    name: user.fullName || user.firstName || "User",
    email: user.primaryEmailAddress?.emailAddress,
    picture: user.imageUrl,
    id: user.id
  } : null;

  return (
    <AuthContext.Provider value={{ 
      user: authUser, 
      login: () => openSignIn(), 
      logout: () => signOut(), 
      loading: !isLoaded 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

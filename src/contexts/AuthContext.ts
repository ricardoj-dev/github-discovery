import { ApplicationUser } from "@/types";
import { createContext } from "react";

type AuthContextType = {
  user: ApplicationUser | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

import { IContextType, IUser, TokenPayload } from "../types/index";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const INITIAL_USER: IUser = {
  id: "",
  name: "",
  email: "",
  imageId: "",
  role: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuthUser = useCallback(async () => {
    setIsLoading(true);
    const token = Cookies.get("token");

    if (token) {
      try {
        const decodedToken: TokenPayload = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          Cookies.remove("token");
          navigate("/login");
          setIsAuthenticated(false);
          setIsLoading(false);
          return false;
        }

        setUser({
          id: decodedToken.sub,
          name: decodedToken.name,
          email: decodedToken.email,
          imageId: decodedToken.imageId || "",
          role: decodedToken.role || "",
        });
        setIsAuthenticated(true);
        setIsLoading(false);
        return true;
      } catch (error) {
        Cookies.remove("token");
        setIsAuthenticated(false);
        navigate("/login");
      }
    } else {
      navigate("/login");
      setIsAuthenticated(false);
    }
    setIsLoading(false);
    return false;
  }, [navigate]);

  const checkSessionExpiration = useCallback(() => {
    const token = Cookies.get("token");

    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkSessionExpiration();
    }, 6000);

    return () => clearInterval(interval);
  }, [checkSessionExpiration]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);

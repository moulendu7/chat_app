import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;
const TOKEN_KEY = "jwttoken";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setLoading(false);
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .get(`${API_URL}/me`)
      .then(res => setUser(res.data.data))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const loginUser = (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(user);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // ✅ user ke liye pura object rakhenge
  const [user, setUser] = useState(null);

  // login me user ka data set kar denge
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // persist in localStorage
  };

  // logout me user hata denge
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // isAuthenticated ko user ke basis pe decide karenge
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

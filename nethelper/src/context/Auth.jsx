import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (email === "client@nethelper.ru" && password === "client123") {
      setUser({ role: "user", email });
    } else if (email === "im@niagarik.website" && password === "admin123") {
      setUser({ role: "admin", email });
    } else {
      throw new Error("Неверный email или пароль");
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

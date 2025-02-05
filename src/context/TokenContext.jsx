import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("myToken"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("myToken", token);
    } else {
      localStorage.removeItem("myToken");
    }
  }, [token]);

  let values = {
    token,
    setToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

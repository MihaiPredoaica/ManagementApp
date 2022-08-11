import React, { createContext, useState } from "react";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [navBarVisible, setNavBarVisible] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        navBarVisible,
        setNavBarVisible,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

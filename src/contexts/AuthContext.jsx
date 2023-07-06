import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }){
  const persiste = JSON.parse(localStorage.getItem("userAuth"));
    const [userAuth, setUserAuth] = useState(persiste);
    
    const login = (userData) => {
      setUserAuth(userData);
      localStorage.setItem("userAuth", JSON.stringify(userData)); 
    }

    useEffect(() => {
      const persiste = JSON.parse(localStorage.getItem("userAuth"));
      if (!persiste) {
        setUserAuth(null);
      }
    }, []);

    return (
      <AuthContext.Provider value={{userAuth, login}}>
        {children}
      </AuthContext.Provider>
    );
  };

export default AuthContext;


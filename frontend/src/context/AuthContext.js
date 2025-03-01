import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    
    if (storedToken && typeof storedToken === 'string' && storedToken.length > 10) {
      setToken(storedToken);
    } else {
     
      if (storedToken) {
        localStorage.removeItem("token");
      }
      setToken(undefined);
    }
    
    setLoading(false);
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/Login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Initializing application...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ token, setToken, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
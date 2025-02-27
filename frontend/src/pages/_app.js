import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Login from "./Login";

export default function App({ Component, pageProps }) {
  const [isauthenicated, setisauthenicated] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      console.log(localStorage.getItem("token"))
      const accesstoken = localStorage.getItem("token");
      if (accesstoken) {
        setisauthenicated(true);
      } else {
        setisauthenicated(false);
      }
    };

    checkUser();
    setloading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      {isauthenicated ? (
        <Component {...pageProps} />
      ) : (
        <Login />
      )}
    </>
  );
}

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import Login from "./Login";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
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
    <div>
       {isauthenicated ? (
        <div></div>
      ) : (
        <Login />
      )}
    </div>
  );
}

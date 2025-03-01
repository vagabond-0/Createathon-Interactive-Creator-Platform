import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Challenge from "@/Components/Home/Challenge";
import Navbar from "@/Components/Home/Navbar";
import { AuthContext } from "@/context/AuthContext";

const Home = () => {
  const { token } = useContext(AuthContext);
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  
  useEffect(() => {
    if (token === null) {
      return;
    }
    
    if (!token) {
      console.log("Redirecting to Login due to missing token");
      router.push("/Login");
      return;
    }
    
    const getAllChallenges = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/challenge/getallchallenge/",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        setChallenges(response.data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        
        if (error.response) {
    
          if (error.response.status === 401) {
            console.log("Token expired or invalid, redirecting to login");
            localStorage.removeItem("token"); 
            router.push("/Login");
          } else {
            setError(`Failed to fetch challenges: ${error.response.data || error.response.status}`);
          }
        } else if (error.request) {
          setError("Server not responding. Please check your connection.");
        } else {
          setError(`An error occurred: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };
    
    getAllChallenges();
  }, [token, router]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  
  if (error && token) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }
  
  return (
    <>
      <Navbar /> 
      <div className="h-fit w-screen text-mono p-4">
        {challenges.length === 0 ? (
          <p className="text-center text-gray-500 my-8">No challenges available</p>
        ) : (
          <Challenge challenges={challenges} />
        )}
      </div>
    </>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Challenge from '@/Components/Home/Challenge';
import Navbar from '@/Components/Home/Navbar';

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/Login");
      return;
    }

    const getAllChallenges = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/challenge/getallchallenge/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        console.log(response.data);

        setChallenges(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching challenges:", error);
        setError("Failed to fetch challenges. Please try again.");
        setLoading(false);
      }
    };

    getAllChallenges();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {router.pathname !== "/logout" && <Navbar />}
      <div className="h-fit w-screen text-mono">
        <div>
          {challenges.length === 0 ? (
            <p>No challenges available</p>
          ) : (
          <div>
              <Challenge challenges={challenges}/>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;

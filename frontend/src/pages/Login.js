import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password,
      });
  
      if (response.status === 200) {
        console.log(response.data)
        localStorage.setItem("token",response.data.access)
        setPopup(true);
        setMessage('Login successful');
        setTimeout(() => {
          setPopup(false);
          router.push('/'); 
          window.location.reload()
        }, 1000);
      } else {
        setPopup(true);
        setMessage('Login Failed');
        setTimeout(() => {
          setPopup(false);
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        if (error.response.status === 401) {
          setPopup(true);
          setMessage('Invalid credentials, please try again.');
        } else {
          setPopup(true);
          setMessage(`An error occurred: ${error.response.status}`);
        }
      } else if (error.request) {
        setPopup(true);
        setMessage('No response from the server. Please check your internet connection.');
      } else {
        setPopup(true);
        setMessage(`An unexpected error occurred: ${error.message}`);
      }
  
      setTimeout(() => {
        setPopup(false);
      }, 3000);
    }
  };
  

  return (
    <div className="h-screen w-screen flex justify-center items-center font-mono">
      <div className="border-2 border-black border-solid flex flex-col gap-5 p-10">
        <h1 className="mb-10 font-bold text-center text-4xl">Creathon</h1>
        <div className="flex flex-col gap-2">
          <label className="text-2xl">Username</label>
          <input
            type="text"
            placeholder="Enter the username"
            className="p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-2xl">Password</label>
          <input
            type="password"
            placeholder="Enter the password"
            className="p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-gray-800 text-white p-2 text-3xl"
          onClick={handleSubmit}
        >
          Login
        </button>
        <p>
          <span>Not registered yet?</span>
          <a href="/register" className="text-blue-600">
            click here
          </a>
        </p>
      </div>

      {popup && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-3xl p-4 shadow-lg">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default Login;

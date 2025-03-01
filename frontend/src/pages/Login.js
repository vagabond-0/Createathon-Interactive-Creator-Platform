  import React, { useContext, useState } from 'react';
  import axios from 'axios';
  import { useRouter } from 'next/router';
  import Link from 'next/link';
  import { AuthContext } from '@/context/AuthContext';

  const Login = () => {
    const { setToken } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [popup, setPopup] = useState(false);
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const handleSubmit = async () => {
     
      if (!username.trim() || !password.trim()) {
        setPopup(true);
        setMessage('Please enter both username and password');
        setTimeout(() => {
          setPopup(false);
        }, 3000);
        return;
      }
      
      setIsLoading(true);
      
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/token/', {
          username,
          password,
        });
        
        if (response.data && response.data.access) {
          console.log("Login successful");
          localStorage.setItem("token", response.data.access);
          
          setToken(response.data.access);
          
          setPopup(true);
          setMessage('Login successful');
          
          setTimeout(() => {
            setPopup(false);
            router.push('/');
          }, 1000);
        } else {
          setPopup(true);
          setMessage('Login failed: Invalid server response');
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
            setMessage(`Login error: ${error.response.data?.detail || error.response.status}`);
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
      } finally {
        setIsLoading(false);
      }
    };
    
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
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
              onKeyPress={handleKeyPress}
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
              onKeyPress={handleKeyPress}
            />
          </div>
          <button
            className={`bg-gray-800 text-white p-2 text-3xl ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
          <p>
            <span>Not registered yet? </span>
            <Link href="/register" className="text-blue-600">
              click here
            </Link>
          </p>
        </div>
        {popup && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white rounded-3xl p-4 shadow-lg z-50">
            <p>{message}</p>
          </div>
        )}
      </div>
    );
  };

  export default Login;
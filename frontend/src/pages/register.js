import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [popup, setPopup] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== password2) {
      setPopup(true);
      setMessage('Passwords do not match');
      setTimeout(() => setPopup(false), 3000);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', {
        username,
        password,
        password2,
        email,
        first_name: firstName,
        last_name: lastName,
      });

      if (response.status === 201) {
        setPopup(true);
        setMessage('Registration successful!');
        setTimeout(() => {
          setPopup(false);
          router.push('/Login'); 
        }, 2000);
      } else {
        setPopup(true);
        setMessage('Registration failed');
        setTimeout(() => setPopup(false), 3000);
      }
    } catch (error) {
      console.error('Error response:', error.response);
      if (error.response) {
        setPopup(true);
        setMessage(`An error occurred: ${error.response.status}`);
        setTimeout(() => setPopup(false), 3000);
      }
    }
  };

  return (
    <div className="h-fit w-screen flex justify-center items-center p-2 pt-10">
      <div className="border-2 border-solid border-black font-mono p-10">
        <h1 className="text-3xl text-center mb-5">Register With Us</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-xl">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="p-2 border-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="p-2 border-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl">First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              className="p-2 border-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl">Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              className="p-2 border-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="p-2 border-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xl">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="p-2 border-2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white p-2 text-xl mt-4"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-center">
          Already have an account?{' '}
          <Link href="/Login" className="text-blue-600">
            Login here
          </Link>
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

export default Register;

import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = () => {
    console.log(localStorage.getItem("token"))
    localStorage.clear();
    router.push("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold">Creathon</div>
      <div className="relative">
        <button
          className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span>Profile</span>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg overflow-hidden">
            <button 
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => router.push("/profile")}
            >
              Profile
            </button>
            <button 
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

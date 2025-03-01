import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from '@/context/AuthContext';

const Navbar = () => {
  const { signOut } = useContext(AuthContext);
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    router.push("/Login");
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-2xl font-bold">Creathon</h1>
      <div className="relative">
        <button onClick={() => setDropdownOpen(!dropdownOpen)}>Profile</button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-md">
            <button className="block px-4 py-2 w-full text-left" onClick={handleSignOut}>Sign Out</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

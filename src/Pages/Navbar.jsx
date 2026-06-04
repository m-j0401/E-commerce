import React, {  useState } from "react";
import { Link } from "react-router-dom";



const Navbar = () => {
  


  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
      <div className="mx-auto max-w-6xl py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        <h1 className="text-xl font-bold text-white tracking-wide">
          Product Listing
        </h1>

        <Link
          to="/"
          className="text-sm text-white bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition"
        >
          Home
        </Link>
        

      </div>
    </header>
  )
}

export default Navbar
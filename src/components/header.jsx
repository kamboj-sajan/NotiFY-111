import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
     <div>

    <nav className="flex justify-between items-center px-10 py-5 bg-black shadow-md">
      <div>
        <h1 className="text-2xl m-0 font-bold font-sans text-green-500">NotiFY</h1>
      </div>
      <div>
          <Link 
            to="/login" 
            className="px-5 py-2 border border-blue-500 text-blue-500 rounded-md transition-colors duration-300 hover:bg-blue-500 hover:text-white"
          >
            Sign in
          </Link>
        </div>
    </nav>
     </div>

  );
}

export default Header;

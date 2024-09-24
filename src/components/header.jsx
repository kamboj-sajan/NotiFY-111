import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
     <div>

    <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-md">
      <div>
        <h1 className="text-2xl m-0 font-normal">NotiFY</h1>
      </div>
      <div>
          <Link 
            to="/login" 
            className="px-5 py-2 border border-[#00254d] text-[#00254d] rounded-md transition-colors duration-300 hover:bg-[#00254d] hover:text-white"
          >
            Sign in
          </Link>
        </div>
    </nav>
     </div>

  );
}

export default Header;

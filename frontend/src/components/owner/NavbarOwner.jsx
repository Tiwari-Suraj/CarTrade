import React from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { Link } from "react-router-dom";

const NavbarOwner = () => {
  const user = dummyUserData;

  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
      <Link to="/">
        <div className="flex flex-row items-center gap-2">
          <img src={assets.favicon} alt="logo" className="w-8 h-8" />
          <h1 className="text-3xl font-semibold">CarTrade</h1>
        </div>
      </Link>
      <p>Welcome, {user.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;

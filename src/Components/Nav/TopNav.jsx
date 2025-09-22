import React from "react";

const TopNav = () => {
  return (
    <>
      <div className="bg-purple-800 w-[100vw] h-[8vh] text-white flex justify-evenly items-center text-3xl font-extrabold fixed z-[100]">
        <div className="hidden md:block">Home</div>
        <div className="hidden md:block">About</div>
        <div className="hidden md:block">Products</div>
        <div>
          <img src="/logo.png" alt="logo" className="w-auto mt-8 h-[18vh]" />
        </div>
        <div className="hidden md:block">Shop</div>
        <div className="hidden md:block">Contact</div>
        <div className="hidden md:block">Sponser</div>
      </div>
    </>
  );
};

export default TopNav;

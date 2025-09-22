import React from "react";

const TopNav = () => {
  return (
    <>
      <div className="bg-purple-800 w-[100vw] h-[8vh] text-white flex justify-evenly items-center text-3xl font-extrabold">
        <div>Home</div>
        <div>About</div>
        <div>Products</div>
        <div>
          <img src="/logo.svg" alt="logo" />
        </div>
        <div>Shop</div>
        <div>Contact</div>
        <div>Sponser</div>
      </div>
    </>
  );
};

export default TopNav;

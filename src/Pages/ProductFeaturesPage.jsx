import React from "react";
import videoFile from "../assets/1.webm";

const ProductFeaturesPage = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center  lg:flex-row">
      <span className="text-3xl font-bold text-green-500 mb-6 lg:hidden">
        India Ka Apna COLA
      </span>
      <span className="text-3xl font-bold text-green-500 mb-6 hidden lg:block">
        India Ka &nbsp;&nbsp;&nbsp;
      </span>
      {/* iPhone Mockup Container */}
      <div className="relative w-[320px] h-[640px] bg-black rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-2xl z-20"></div>

        {/* Side Buttons */}
        <div className="absolute -left-[12px] top-[80px] w-[3px] h-[50px] bg-gray-700 rounded"></div>
        <div className="absolute -left-[12px] top-[150px] w-[3px] h-[30px] bg-gray-700 rounded"></div>
        <div className="absolute -right-[12px] top-[100px] w-[3px] h-[80px] bg-gray-700 rounded"></div>

        {/* Screen Content */}
        <video
          src={videoFile}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          Video or Javascript Not Supported
        </video>
      </div>
      <span className="text-3xl font-bold text-green-500 mb-6 hidden lg:block">
        &nbsp;&nbsp;&nbsp; Apna COLA
      </span>
    </div>
  );
};

export default ProductFeaturesPage;

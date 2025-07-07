import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-10 bg-light text-center px-4 md:px-10">
      {/* Hero Heading */}
      <h1 className="bg-black/20 backdrop-blur-md rounded-2xl px-6 py-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 leading-snug">
        Luxury Used Cars on Sale In <br />
        <span className="text-primary font-bold">CarTrade</span>
      </h1>

      {/* Hero Image */}
      <div className="w-full max-w-3xl">
        <img
          src={assets.main_car}
          alt="Luxury Car"
          className="w-full h-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  );
};

export default Hero;

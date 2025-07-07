import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="h-screen flex flex-col items-center justify-center gap-10 bg-light text-center px-4 md:px-10"
    >
      {/* Hero Heading */}
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-black/20 backdrop-blur-md rounded-2xl px-6 py-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-800 leading-snug"
      >
        Luxury Used Cars on Sale In <br />
        <span className="text-primary font-bold">CarTrade</span>
      </motion.h1>

      {/* Hero Image */}
      <div className="w-full max-w-3xl">
        <motion.img
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          src={assets.main_car}
          alt="Luxury Car"
          className="w-full h-auto object-contain drop-shadow-xl transition-transform duration-500 hover:scale-105"
        />
      </div>
    </motion.div>
  );
};

export default Hero;

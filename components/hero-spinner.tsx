"use client";

import { motion } from "framer-motion";

export function HeroSpinner() {
  return (
    <div className="h-[340px] bg-bg-hero flex flex-col items-center justify-center text-white overflow-hidden">
      <div className="relative w-20 h-20">
        {/* Spinning outer ring */}
        <motion.div
          className="absolute inset-0 border-4 border-gray-200/20 border-t-yellow-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        {/* Center icon */}
        <div className="absolute inset-0 m-auto w-10 h-10 flex items-center justify-center text-3xl">
          🍽️
        </div>
      </div>
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8 text-[28px] font-light tracking-tight text-center px-4"
      >
        Looking for great food near you...
      </motion.h2>
    </div>
  );
}

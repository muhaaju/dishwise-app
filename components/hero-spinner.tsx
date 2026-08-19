"use client";

import { motion } from "framer-motion";

const foodEmojis = ["🍕", "🍔", "🍜", "🍱", "🌮", "🍛", "🥘", "🍝"];

export function HeroSpinner() {
  return (
    <div className="h-[340px] bg-bg-hero flex flex-col items-center justify-center text-white overflow-hidden relative">
      {/* Floating Food Emojis */}
      {foodEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl"
          initial={{ 
            x: Math.cos((index * Math.PI * 2) / foodEmojis.length) * 150,
            y: Math.sin((index * Math.PI * 2) / foodEmojis.length) * 150,
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            x: Math.cos((index * Math.PI * 2) / foodEmojis.length) * 180,
            y: Math.sin((index * Math.PI * 2) / foodEmojis.length) * 180,
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut"
          }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Center Animation Container */}
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Spinning outer ring */}
        <motion.div
          className="absolute inset-0 border-4 border-gray-200/20 border-t-yellow-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute inset-2 border-4 border-gray-200/10 border-b-orange-500 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Animated Hand with Food */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-5xl">
            <motion.span
              animate={{ 
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              🍽️
            </motion.span>
          </div>
        </motion.div>

        {/* Moving Fingers/Hand */}
        <motion.div
          className="absolute text-3xl"
          initial={{ x: -60, y: 40, opacity: 0 }}
          animate={{ 
            x: [-60, -40, -60],
            y: [40, 30, 40],
            opacity: [0, 1, 0],
            rotate: [0, -10, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          👆
        </motion.div>
      </div>

      {/* Text with Typing Animation */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-center px-4"
      >
        <motion.h2
          className="text-[28px] font-light tracking-tight mb-2"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Finding the best restaurants for you
        </motion.h2>
        <motion.p
          className="text-lg text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Save up to 30% by ordering direct
        </motion.p>
      </motion.div>

      {/* Animated Dots */}
      <motion.div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

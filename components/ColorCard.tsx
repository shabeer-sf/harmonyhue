// File: components/ColorCard.tsx
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface ColorCardProps {
  color: string;
  index: number;
  contrastColor: string;
  onCopy: (color: string) => void;
}

export default function ColorCard({ color, index, contrastColor, onCopy }: ColorCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="h-16 md:h-20 rounded-lg overflow-hidden flex items-center cursor-pointer shadow-sm hover:shadow-md relative"
      style={{ backgroundColor: color }}
      onClick={() => onCopy(color)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex justify-between w-full px-4 py-2">
        <span 
          className="font-medium"
          style={{ color: contrastColor }}
        >
          Color {index + 1}
        </span>
        <span 
          className="font-mono"
          style={{ color: contrastColor }}
        >
          {color.toUpperCase()}
        </span>
      </div>
      
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10"
        >
          <span 
            className="px-3 py-1 rounded-full text-sm font-medium"
            style={{ 
              backgroundColor: contrastColor, 
              color: color
            }}
          >
            Click to copy
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
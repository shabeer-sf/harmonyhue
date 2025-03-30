// File: components/ColorPalette.tsx
'use client';

import { ColorScheme } from '@/app/page';
import { motion, AnimatePresence } from 'framer-motion';
import ColorCard from '@/components/ColorCard';

interface ColorPaletteProps {
  colorScheme: ColorScheme;
  getContrastColor: (hexColor: string) => string;
  copyToClipboard: (color: string) => void;
}

export default function ColorPalette({
  colorScheme,
  getContrastColor,
  copyToClipboard
}: ColorPaletteProps) {
  return (
    <div className="md:col-span-2">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">
          {colorScheme.name} Palette
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Click on a color to copy its hex code to clipboard
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 gap-3"
        layout
      >
        <AnimatePresence initial={false}>
          {colorScheme.colors.map((color, index) => (
            <ColorCard
              key={`${color}-${index}`}
              color={color}
              index={index}
              contrastColor={getContrastColor(color)}
              onCopy={copyToClipboard}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
// File: components/InfoSection.tsx
'use client';

import { motion } from 'framer-motion';

export default function InfoSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 md:p-8 mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">About HarmonyHue</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-400">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3 className="font-medium text-gray-800 dark:text-white mb-1">Analogous</h3>
          <p className="text-sm">Colors that are adjacent to each other on the color wheel. They usually match well and create serene designs.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h3 className="font-medium text-gray-800 dark:text-white mb-1">Monochromatic</h3>
          <p className="text-sm">Different shades and tints of a single color. This creates a cohesive look that's easy on the eyes.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h3 className="font-medium text-gray-800 dark:text-white mb-1">Triadic</h3>
          <p className="text-sm">Three colors evenly spaced around the color wheel. This provides high contrast while maintaining harmony.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <h3 className="font-medium text-gray-800 dark:text-white mb-1">Complementary</h3>
          <p className="text-sm">Colors located opposite each other on the color wheel. They create maximum contrast and stability.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="md:col-span-2"
        >
          <h3 className="font-medium text-gray-800 dark:text-white mb-1">Split Complementary</h3>
          <p className="text-sm">A variation of complementary harmony. It uses the base color and two colors adjacent to its complement. This provides high contrast but less tension.</p>
        </motion.div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-800 dark:text-white mb-2">How to Use These Color Schemes</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>Use your primary color for main elements like headers and buttons</li>
          <li>Secondary colors work great for accents and supporting elements</li>
          <li>Ensure sufficient contrast between text and background colors</li>
          <li>Consider using the 60-30-10 rule: 60% primary color, 30% secondary color, 10% accent color</li>
        </ul>
      </div>
    </motion.div>
  );
}
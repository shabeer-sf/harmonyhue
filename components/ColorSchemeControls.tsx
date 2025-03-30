// File: components/ColorSchemeControls.tsx
'use client';

import { HarmonyType } from '@/app/page';

interface ColorSchemeControlsProps {
  baseColor: string;
  setBaseColor: (color: string) => void;
  harmonyType: HarmonyType;
  setHarmonyType: (type: HarmonyType) => void;
  colorCount: number;
  setColorCount: (count: number) => void;
  copyAllToClipboard: () => void;
  copyAsCSSVariables: () => void;
}

export default function ColorSchemeControls({
  baseColor,
  setBaseColor,
  harmonyType,
  setHarmonyType,
  colorCount,
  setColorCount,
  copyAllToClipboard,
  copyAsCSSVariables
}: ColorSchemeControlsProps) {
  return (
    <div className="md:col-span-1 space-y-6">
      <div>
        <label htmlFor="baseColor" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Base Color
        </label>
        <div className="flex space-x-3">
          <input
            type="color"
            id="baseColor"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="h-10 w-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
          />
          <input
            type="text"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="harmonyType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Harmony Type
        </label>
        <select
          id="harmonyType"
          value={harmonyType}
          onChange={(e) => setHarmonyType(e.target.value as HarmonyType)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
        >
          <option value="analogous">Analogous</option>
          <option value="monochromatic">Monochromatic</option>
          <option value="triadic">Triadic</option>
          <option value="complementary">Complementary</option>
          <option value="split-complementary">Split Complementary</option>
        </select>
      </div>

      <div>
        <label htmlFor="colorCount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Number of Colors: {colorCount}
        </label>
        <input
          type="range"
          id="colorCount"
          min="2"
          max="9"
          value={colorCount}
          onChange={(e) => setColorCount(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      <div className="pt-4 space-y-2">
        <button
          onClick={copyAllToClipboard}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy All Colors
        </button>
        <button
          onClick={copyAsCSSVariables}
          className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          Copy as CSS Variables
        </button>
      </div>
    </div>
  );
}
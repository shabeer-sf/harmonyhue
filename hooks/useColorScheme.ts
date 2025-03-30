// File: hooks/useColorScheme.ts
'use client';

import { useState, useEffect } from 'react';
import { hexToHSL, hslToHex } from '@/utils/colorUtils';

// Types
export type ColorScheme = {
  name: string;
  colors: string[];
};

export type HarmonyType = 'analogous' | 'monochromatic' | 'triadic' | 'complementary' | 'split-complementary';

export function useColorScheme(initialColor: string = '#6366f1', initialHarmony: HarmonyType = 'analogous', initialCount: number = 5) {
  const [baseColor, setBaseColor] = useState<string>(initialColor);
  const [harmonyType, setHarmonyType] = useState<HarmonyType>(initialHarmony);
  const [colorCount, setColorCount] = useState<number>(initialCount);
  const [colorScheme, setColorScheme] = useState<ColorScheme>({ name: 'Analogous', colors: [] });

  // Generate color scheme whenever inputs change
  useEffect(() => {
    generateColorScheme();
  }, [baseColor, harmonyType, colorCount]);

  // Generate color scheme based on the selected harmony type
  const generateColorScheme = () => {
    const { h, s, l } = hexToHSL(baseColor);
    let colors: string[] = [];
    let schemeName = '';

    switch (harmonyType) {
      case 'analogous':
        schemeName = 'Analogous';
        colors = generateAnalogousColors(h, s, l, colorCount);
        break;
      case 'monochromatic':
        schemeName = 'Monochromatic';
        colors = generateMonochromaticColors(h, s, l, colorCount);
        break;
      case 'triadic':
        schemeName = 'Triadic';
        colors = generateTriadicColors(h, s, l, colorCount);
        break;
      case 'complementary':
        schemeName = 'Complementary';
        colors = generateComplementaryColors(h, s, l, colorCount);
        break;
      case 'split-complementary':
        schemeName = 'Split Complementary';
        colors = generateSplitComplementaryColors(h, s, l, colorCount);
        break;
    }

    setColorScheme({ name: schemeName, colors });
  };

  // Generate analogous colors
  const generateAnalogousColors = (h: number, s: number, l: number, count: number): string[] => {
    const colors: string[] = [];
    const step = 30 / (count - 1);
    
    for (let i = 0; i < count; i++) {
      const newHue = (h + step * i - 30 / 2) % 360;
      colors.push(hslToHex(newHue < 0 ? newHue + 360 : newHue, s, l));
    }
    
    return colors;
  };

  // Generate monochromatic colors
  const generateMonochromaticColors = (h: number, s: number, l: number, count: number): string[] => {
    const colors: string[] = [];
    const step = 60 / (count - 1);
    
    for (let i = 0; i < count; i++) {
      const newLightness = Math.max(0, Math.min(100, l - 30 + step * i));
      colors.push(hslToHex(h, s, newLightness));
    }
    
    return colors;
  };

  // Generate triadic colors
  const generateTriadicColors = (h: number, s: number, l: number, count: number): string[] => {
    const colors: string[] = [];
    
    if (count < 3) {
      // Fallback for fewer than 3 colors
      return generateAnalogousColors(h, s, l, count);
    }
    
    // The three main triadic colors
    const triadicColors = [
      hslToHex(h, s, l),
      hslToHex((h + 120) % 360, s, l),
      hslToHex((h + 240) % 360, s, l)
    ];
    
    if (count === 3) {
      return triadicColors;
    }
    
    // For more than 3 colors, interpolate between the triadic colors
    const segments = count - 1;
    const segmentsPerTriad = segments / 3;
    
    for (let i = 0; i < count; i++) {
      const triadIndex = Math.min(2, Math.floor(i / segmentsPerTriad));
      const nextTriadIndex = Math.min(2, triadIndex + 1);
      const progress = (i % segmentsPerTriad) / segmentsPerTriad;
      
      if (progress === 0 || i === count - 1) {
        colors.push(triadicColors[triadIndex]);
      } else {
        const color1 = hexToHSL(triadicColors[triadIndex]);
        const color2 = hexToHSL(triadicColors[nextTriadIndex]);
        
        // Interpolate between the two colors
        let h = color1.h + ((color2.h - color1.h + 540) % 360 - 180) * progress;
        if (h < 0) h += 360;
        if (h >= 360) h -= 360;
        
        const s = color1.s + (color2.s - color1.s) * progress;
        const l = color1.l + (color2.l - color1.l) * progress;
        
        colors.push(hslToHex(h, s, l));
      }
    }
    
    return colors;
  };

  // Generate complementary colors
  const generateComplementaryColors = (h: number, s: number, l: number, count: number): string[] => {
    const colors: string[] = [];
    
    if (count < 2) {
      return [hslToHex(h, s, l)];
    }
    
    const complementaryHue = (h + 180) % 360;
    
    if (count === 2) {
      return [hslToHex(h, s, l), hslToHex(complementaryHue, s, l)];
    }
    
    // For more than 2 colors, interpolate between the base color and its complement
    for (let i = 0; i < count; i++) {
      const progress = i / (count - 1);
      let newHue = h + progress * 180;
      if (newHue >= 360) newHue -= 360;
      
      colors.push(hslToHex(newHue, s, l));
    }
    
    return colors;
  };

  // Generate split-complementary colors
  const generateSplitComplementaryColors = (h: number, s: number, l: number, count: number): string[] => {
    const colors: string[] = [];
    
    if (count < 3) {
      // Fallback for fewer than 3 colors
      return generateComplementaryColors(h, s, l, count);
    }
    
    const complementaryHue = (h + 180) % 360;
    const splitHue1 = (complementaryHue - 30 + 360) % 360;
    const splitHue2 = (complementaryHue + 30) % 360;
    
    if (count === 3) {
      return [hslToHex(h, s, l), hslToHex(splitHue1, s, l), hslToHex(splitHue2, s, l)];
    }
    
    // For more than 3 colors, interpolate between the base color and both split complements
    const step = 1 / (count - 1);
    
    for (let i = 0; i < count; i++) {
      const progress = i * step;
      
      if (progress <= 0.5) {
        // Interpolate between base color and first split complement
        const p = progress * 2;
        let newHue = h + p * ((splitHue1 - h + 360) % 360);
        if (newHue >= 360) newHue -= 360;
        
        colors.push(hslToHex(newHue, s, l));
      } else {
        // Interpolate between first split complement and second split complement
        const p = (progress - 0.5) * 2;
        let newHue = splitHue1 + p * ((splitHue2 - splitHue1 + 360) % 360);
        if (newHue >= 360) newHue -= 360;
        
        colors.push(hslToHex(newHue, s, l));
      }
    }
    
    return colors;
  };

  return {
    baseColor,
    setBaseColor,
    harmonyType,
    setHarmonyType,
    colorCount,
    setColorCount,
    colorScheme
  };
}
// File: app/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import ColorSchemeControls from '@/components/ColorSchemeControls';
import ColorPalette from '@/components/ColorPalette';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';

// Types
export type ColorScheme = {
  name: string;
  colors: string[];
};

export type HarmonyType = 'analogous' | 'monochromatic' | 'triadic' | 'complementary' | 'split-complementary';

export default function Home() {
  const [baseColor, setBaseColor] = useState<string>('#6366f1');
  const [harmonyType, setHarmonyType] = useState<HarmonyType>('analogous');
  const [colorScheme, setColorScheme] = useState<ColorScheme>({ name: 'Analogous', colors: [] });
  const [colorCount, setColorCount] = useState<number>(5);

  // Generate the color scheme whenever inputs change
  useEffect(() => {
    generateColorScheme();
  }, [baseColor, harmonyType, colorCount]);

  // Convert hex to HSL
  const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
    // Remove the # if present
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  // Convert HSL to hex
  const hslToHex = (h: number, s: number, l: number): string => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

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

  // Copy color to clipboard
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color).then(() => {
      toast.success(`Copied ${color} to clipboard!`, {
        duration: 1500,
        position: 'bottom-center',
      });
    }).catch(err => {
      toast.error('Failed to copy color.');
      console.error('Failed to copy: ', err);
    });
  };

  // Copy all colors to clipboard
  const copyAllToClipboard = () => {
    const colorText = colorScheme.colors.join(', ');
    navigator.clipboard.writeText(colorText).then(() => {
      toast.success('All colors copied to clipboard!', {
        duration: 1500,
        position: 'bottom-center',
      });
    }).catch(err => {
      toast.error('Failed to copy colors.');
      console.error('Failed to copy: ', err);
    });
  };

  // Copy colors as CSS variables
  const copyAsCSSVariables = () => {
    const cssVars = colorScheme.colors.map((color, index) => 
      `--color-${index + 1}: ${color};`
    ).join('\n');
    
    navigator.clipboard.writeText(`:root {\n${cssVars}\n}`).then(() => {
      toast.success('Copied as CSS variables!', {
        duration: 1500,
        position: 'bottom-center',
      });
    }).catch(err => {
      toast.error('Failed to copy CSS variables.');
      console.error('Failed to copy: ', err);
    });
  };

  // Calculate contrasting text color for readability
  const getContrastColor = (hexColor: string): string => {
    const { l } = hexToHSL(hexColor);
    return l > 60 ? '#000000' : '#ffffff';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster />

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Color Scheme Generator
        </h1>

        <div className="mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Controls */}
              <ColorSchemeControls 
                baseColor={baseColor}
                setBaseColor={setBaseColor}
                harmonyType={harmonyType}
                setHarmonyType={setHarmonyType}
                colorCount={colorCount}
                setColorCount={setColorCount}
                copyAllToClipboard={copyAllToClipboard}
                copyAsCSSVariables={copyAsCSSVariables}
              />

              {/* Color Palette */}
              <ColorPalette 
                colorScheme={colorScheme}
                getContrastColor={getContrastColor}
                copyToClipboard={copyToClipboard}
              />
            </div>
          </div>
        </div>

        <InfoSection />
      </main>

      <Footer />
    </div>
  );
}
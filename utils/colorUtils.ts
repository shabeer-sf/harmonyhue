// File: utils/colorUtils.ts

/**
 * Converts a hex color code to HSL (Hue, Saturation, Lightness) values
 * @param hex - The hex color code (e.g., "#ff0000")
 * @returns Object containing h, s, l values (hue: 0-360, saturation: 0-100, lightness: 0-100)
 */
export const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
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
  
  /**
   * Converts HSL (Hue, Saturation, Lightness) values to a hex color code
   * @param h - Hue value (0-360)
   * @param s - Saturation value (0-100)
   * @param l - Lightness value (0-100)
   * @returns Hex color code (e.g., "#ff0000")
   */
  export const hslToHex = (h: number, s: number, l: number): string => {
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
  
  /**
   * Calculates a contrasting text color (black or white) based on background color
   * @param hexColor - The background hex color
   * @returns Black (#000000) or white (#ffffff) depending on which has better contrast
   */
  export const getContrastColor = (hexColor: string): string => {
    const { l } = hexToHSL(hexColor);
    return l > 60 ? '#000000' : '#ffffff';
  };
  
  /**
   * Generates a palette of colors based on a base color
   * @param baseColor - The base hex color
   * @param count - Number of colors to generate (default: 5)
   * @returns Array of hex color codes
   */
  export const generateMonochromaticPalette = (baseColor: string, count: number = 5): string[] => {
    const { h, s, l } = hexToHSL(baseColor);
    const colors: string[] = [];
    const step = 60 / (count - 1);
    
    for (let i = 0; i < count; i++) {
      const newLightness = Math.max(0, Math.min(100, l - 30 + step * i));
      colors.push(hslToHex(h, s, newLightness));
    }
    
    return colors;
  };
  
  /**
   * Checks if a color is valid
   * @param color - Color string to validate
   * @returns Boolean indicating if the color is valid
   */
  export const isValidColor = (color: string): boolean => {
    // Check if it's a valid hex color (3, 4, 6, or 8 digits)
    const hexPattern = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
    
    // Check if it's a valid rgb/rgba color
    const rgbPattern = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/;
    const rgbaPattern = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(\d?\.\d+|\d+)\s*\)$/;
    
    // Check if it's a valid hsl/hsla color
    const hslPattern = /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/;
    const hslaPattern = /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*(\d?\.\d+|\d+)\s*\)$/;
    
    return hexPattern.test(color) || 
           rgbPattern.test(color) || 
           rgbaPattern.test(color) || 
           hslPattern.test(color) || 
           hslaPattern.test(color);
  };
  
  /**
   * Converts any valid CSS color to a hex code
   * @param color - Input color (hex, rgb, rgba, hsl, hsla, or named color)
   * @returns Hex color code
   */
  export const toHexColor = (color: string): string => {
    // Create a temporary element to use the browser's color parsing
    const tempElement = document.createElement('div');
    tempElement.style.color = color;
    document.body.appendChild(tempElement);
    
    // Get computed style
    const computedColor = window.getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);
    
    // Parse RGB values from computed style
    const rgbMatch = computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgbMatch) {
      const r = parseInt(rgbMatch[1], 10);
      const g = parseInt(rgbMatch[2], 10);
      const b = parseInt(rgbMatch[3], 10);
      
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }
    
    return color; // Return original if conversion failed
  };
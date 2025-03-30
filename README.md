# Color Scheme Generator

A modern, responsive web application that generates harmonious color palettes based on color theory. Built with Next.js App Router, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Multiple Harmony Types** - Generate color schemes using different harmony rules:
  - Analogous
  - Monochromatic
  - Triadic
  - Complementary
  - Split-Complementary

- 🔄 **Customizable** - Adjust the number of colors in your palette (2-9 colors)

- 📋 **Easy Export** - Copy colors to clipboard in different formats:
  - Individual colors
  - Comma-separated list
  - CSS variables

- 🌓 **Dark Mode Support** - Automatic detection of system color scheme preference

- 📱 **Fully Responsive** - Works great on desktop, tablet, and mobile devices

- ⚡ **Built with Modern Technologies**:
  - Next.js 14 (App Router)
  - TypeScript
  - Tailwind CSS
  - Framer Motion for smooth animations

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/color-scheme-generator.git
cd color-scheme-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
/
├── app/                    # Next.js App Router files
│   ├── page.tsx            # Main page component
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── ColorPalette.tsx    # Color palette display
│   ├── ColorSchemeControls.tsx # Controls for adjusting the color scheme
│   ├── InfoSection.tsx     # Information about HarmonyHue
│   └── ThemeToggle.tsx     # Dark/light mode toggle
├── hooks/                  # Custom React hooks
│   └── useColorScheme.ts   # Hook for color scheme generation
├── utils/                  # Utility functions
│   └── colorUtils.ts       # Color conversion and manipulation functions
├── public/                 # Static files
└── README.md               # Project documentation
```

## Deployment

This project can be deployed as a static site using Next.js's static export feature.

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The output will be in the `out` directory, which can be deployed to any static hosting service.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework.
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React.
- [Color Theory](https://www.canva.com/colors/color-wheel/) - Learn about HarmonyHue.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
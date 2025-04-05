module.exports = {
  mode: 'jit',  // Enable JIT mode
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],  // Configure purge options to remove unused styles in production
  theme: {
    extend: {
      colors: {
        brandBlue: '#005f73', // Custom color
        brandGold: '#FFD700',
        brandYellow: '#F4D35E',  
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],  // Custom font
      },
    },
  },
  variants: {
    extend: {},  // Enable additional variants here if needed
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
  
        colors:{
          primary: '#008DDA',
          secondary: '#41C9E2',
          accent: '#d5f2f5',
        },
       
    
      
        animation: {
          'spin-slow': 'spin 1.5s linear infinite',
          'spin-reverse': 'reverseSpin 1.5s linear infinite',
        },
        keyframes: {
          reverseSpin: {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(-360deg)' },
          },
        },
   
    },
  },
  // plugins: [require('tailwind-scrollbar')],
}


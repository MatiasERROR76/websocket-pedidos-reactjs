/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./assests/images/image1.png')",
        "Bg-image": "url('./assests/images/bg-cove-image.jpg')",
        "new-image": "url('./assests/images/images2.jpg')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

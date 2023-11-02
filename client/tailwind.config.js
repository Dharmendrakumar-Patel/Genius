/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/assets/**/*.svg",
  ],
  theme: {
    extend: {
      colors: {
        'light-green': '#53C79E',
      },
      backgroundImage: {
        'auth-background': 'linear-gradient(154.9deg, #53C79D 13.55%, rgba(142, 231, 199, 0) 78.38%)',
        'user-background': "url('https://static.vecteezy.com/system/resources/previews/021/548/095/non_2x/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg')"
      }
    },
  },
  plugins: [],
}


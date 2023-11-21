/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primaryDark: '#1976D2',
        primaryLight: '#BBDEF8',
        primaryText: '#212121',
        primaryColor: '#00BCD4',
        textIcon: '#ffffff',
        accentColor: '#FF9800',
        secondaryText: '#757575',
        dividerColor: '#BDBDBD',
      },
    },
  },
  plugins: [],
};

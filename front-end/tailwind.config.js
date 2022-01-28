const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js, jsx, ts, tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Staatliches: ["Staatliches", "sans-serif"],
        Exo: ["Exo", "sans-serif"],
        Inconsolata: ["Inconsolata", "sans-serif"]
      },
      colors: {
        stone: colors.stone,
        rose: colors.rose,
        mostlyblack: "#080404",
        cyberpink: "#ac61b9",
        cyberblue: "#0b468c",
        cyberdarkblue: "#092047",
        cyberlightblue: "#0b468c",
        cyberred: "#63345e",
        cyberpurple: "#7700a6",
        neonpink: "#fe00fe",
        neonyellow: "#defe47",
        neonlb: "#00b3fe",
        neondb: "#0016ee",
        neonlpurple: "#B026FF",
        neondpurple: "#A629C2",
        neondgreen: "#083e12",
        neonlgreen: "#1afe49",
        cppurple: "#321450",
        cpred: "#860029",
        cppink: "#f887ff",
        cpmidred: "#de004e",
        orange: colors.orange,
        indigo: colors.indigo,
        purple: colors.purple,
        emerald: colors.emerald,
        violet: colors.violet,
        cyan: colors.cyan,
        blue: colors.blue,
        sky: colors.sky,
        green: colors.green,
        gray: colors.gray,
        yellow: colors.yellow,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        borderColor: "#E4E7EC",
        fadedBlue: "#3947CB1A",
        deepBlue: "#3947CB",
        lightBlueGrey: "#344054",
        textNude: "#9A9A9A",
        textShade: "#2D2C2CBD",
        grey: "#3D3D3D",
        lightGrey: "#D9D7D736",
        lightPink: "#FFECE5",
        Navyblue: "#101928",
        placeholderColor: "#98A2B3",
        green: "#40A74E",
        deepRed: "#DE0E1A",
        darkGrey: "#7d7d7d",
        textGrey: "#667185",
        yellow: "#EACB16",
        fadeYellow: "#FEF3F2",
        tableHead: "#535862",
        earlyText: "#067647",
        earlyFade: "#ECFDF3",
        earlyBorder: "#ABEFC6",
        lateText: "#B42318",
        lateFade: "#FEF3F2",
        lateBorder: "#FECDCA",
        fadedWhite: "#FAFAFA",
        fadedGrey: "#F9F9F9",
      },
      boxShadow: {
        tableShadow: "0px 1px 2px 0px #0A0D120D",
        detailShadow: "0px 1px 2px 0px #00000040",
        projectShadow: "0px 4px 4px 0px #00000040"

      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}


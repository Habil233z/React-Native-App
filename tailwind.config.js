/** @type {import('tailwindcss').Config} */
import { platformSelect } from "nativewind/theme";

module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {extend: {
      fontFamily: {
        example: ["ExampleFontFamily"],
        system: platformSelect({
          ios: "Georgia",
          android: "serif",
          default: "ui-sans-serif",})}}},
  },
  plugins: [],
}

import plugin from "tailwindcss/plugin"

const customVariants = plugin(({ addVariant, e }) => {
  addVariant("mode-jungle", `.mode-jungle &`)
  addVariant("mode-ocean", `.mode-ocean &`)
  addVariant("mode-space", `.mode-space &`)
})

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  mode: {
    extend: {},
  },
  plugins: [customVariants],
}

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: false },
  fonts: {
    body: "'Outfit', sans-serif", // Apply Outfit font globally
    heading: "'Outfit', sans-serif",
  },
  styles: {
    global: {
      body: {
        fontFamily: "'Outfit', sans-serif",
      },
      "::-webkit-scrollbar": {
        width: "8px",
        borderRadius: "4px",
        backgroundColor: "#f0f4f9",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#b0b4b9",
        borderRadius: "4px",
      },
    },
  },
});

export default theme;

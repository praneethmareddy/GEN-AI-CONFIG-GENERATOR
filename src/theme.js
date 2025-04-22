import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: { initialColorMode: "light", useSystemColorMode: false },
  fonts: {
    heading: "'Rubik', sans-serif", // Use Rubik for headings
    body: "'Rubik', sans-serif",    // Use Rubik for body text
  },
  styles: {
    global: {
      body: {
        fontFamily:  "'Rubik', sans-serif",
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
  components: {
    Toast: {
      baseStyle: {
        container: {
          bg: 'linear-gradient(to right,rgb(140, 161, 196), #1e40af)', // Custom gradient background
          color: 'white', // Text color
        },
      },
      variants: {
        solid: {
          bg: 'linear-gradient(to right,rgb(140, 161, 196), #1e40af)', // Custom gradient background for solid variant
          color: 'white', // Text color for solid variant
        },
      },
    },
  }
});

export default theme;

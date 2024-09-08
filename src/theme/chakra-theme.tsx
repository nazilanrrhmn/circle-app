import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const themeConfig: ThemeOverride = {
  colors: {
    brand: {
      green: "#04A51E",
      "green-dark": "#005E0E",
      "white-dark": "#909090",
      backgroundCircle: "#1D1D1D",
      backgroundBox: "#262626",
      fontSecondary: "#909090",
      borderAbu: "#545454",
      searchBar: "#3F3F3F",
    },
  },
  fonts: {
    heading: `"Plus Jakarta Sans", sans-serif`,
    body: `"Plus Jakarta Sans", sans-serif`,
    mono: `"Plus Jakarta Sans", sans-serif`,
  },
  sizes: {
    brand: {
      form: "412px",
    },
  },
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#1D1D1D",
        color: "#FFFFFF",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: "full",
      },
    },
    Input: {
      variants: {
        base: {},
      },
    },
  },
};

export const theme = extendTheme(themeConfig satisfies ThemeOverride);

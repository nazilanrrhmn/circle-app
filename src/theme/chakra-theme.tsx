import { extendTheme, ThemeOverride } from "@chakra-ui/react";

const themeConfig: ThemeOverride = {
  colors: {
    brand: {
      green: "#04A51E",
      "green-dark": "#005E0E",
      background: "#1D1D1D",
      borderAbu: "#545454",
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

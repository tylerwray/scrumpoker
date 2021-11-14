import { theme, extendTheme, ThemeOverride } from "@chakra-ui/react";

const { black, gray, red, yellow, green, blue, purple, pink } = theme.colors;

const scrumpokerTheme: ThemeOverride = {
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  shadows: {
    greenOutline: `0px 0px 0px 3px ${green[500]}`,
  },
  fontSizes: {
    huge: "10rem",
  },
  colors: {
    card: {
      black,
      gray: gray[600],
      red: red[500],
      yellow: yellow[600],
      green: green[700],
      blue: blue[700],
      purple: purple[700],
      pink: pink[700],
    },
    gradientCard: {
      patrick: `linear(to-r, ${green[200]}, ${pink[500]})`,
    },
  },
};

export default extendTheme(scrumpokerTheme);

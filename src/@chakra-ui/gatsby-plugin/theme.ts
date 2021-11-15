import { theme, extendTheme, ThemeOverride } from "@chakra-ui/react";

const { green } = theme.colors;

const scrumpokerTheme: ThemeOverride = {
  config: {
    initialColorMode: "system",
  },
  shadows: {
    greenOutline: `0px 0px 0px 3px ${green[500]}`,
  },
  fontSizes: {
    huge: "10rem",
  },
};

export default extendTheme(scrumpokerTheme);

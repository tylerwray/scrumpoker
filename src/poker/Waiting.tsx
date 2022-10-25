import React from "react";
import { Grid, Box, keyframes } from "@chakra-ui/react";
import { BsDot as Dot } from "react-icons/bs";

const fade = keyframes({
  "50%": {
    opacity: 1
  },
});

const style = (index: number) => ({
  opacity: 0.1,
  animation: `1.25s ${fade} infinite ${index * .3333}s`,
  animationDelay: `${index * 100}ms`,
});

function Waiting() {
  return (
    <Grid templateColumns="1fr 1fr 1fr">
      <Box css={style(0)}>
        <Dot size="36" strokeWidth="2" />
      </Box>
      <Box css={style(1)}>
        <Dot size="36" strokeWidth="2" />
      </Box>
      <Box css={style(2)}>
        <Dot size="36" strokeWidth="2" />
      </Box>
    </Grid>
  );
}

export default Waiting;

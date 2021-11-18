import React from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";

type Props = {
  onChange(emoji: string): void;
};

function EmojiPicker({ onChange }: Props) {
  const { colorMode } = useColorMode();

  const color = useColorModeValue("#6B46C1", "#D6BCFA");

  return (
    <Box css=".emoji-mart-anchor-icon {display: flex; justify-content: center;}">
      <Picker
        theme={colorMode}
        set="apple"
        color={color}
        title="Pick your emoji…"
        emoji="point_up"
        onSelect={(emoji) => onChange(emoji.native)}
      />
    </Box>
  );
}

export default React.memo(EmojiPicker);

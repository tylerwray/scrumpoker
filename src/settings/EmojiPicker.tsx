import React, { useEffect } from "react";
import Picker from "emoji-picker-react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";

type Props = {
  onChange(emoji: string): void;
};

const LIGHT_MODE_CSS = css`
  .emoji-picker-react {
    box-shadow: none;

    .emoji-search {
      border: 1px solid var(--chakra-colors-gray-300);
      padding: 8px;
      padding-left: 8px;
    }

    .skin-tones-list {
      top: 16px;
    }
  }
`;

const DARK_MODE_CSS = css`
  .emoji-picker-react {
    box-shadow: none;
    --bg: var(--chakra-colors-gray-900);
    background-color: var(--bg);

    .emoji-categories {
      filter: invert(1);
    }

    .emoji-group::before {
      background-color: var(--bg);
    }

    .emoji-search {
      background-color: var(--bg);
      border: 1px solid var(--chakra-colors-gray-300);
      padding: 8px;
      padding-left: 8px;
    }

    .emoji-search::placeholder {
      color: white;
    }

    .skin-tones-list {
      top: 16px;
    }
  }
`;

function EmojiPicker({ onChange }: Props) {
  const CSS = useColorModeValue(LIGHT_MODE_CSS, DARK_MODE_CSS);

  useEffect(() => {
    document.querySelector<HTMLInputElement>(".emoji-search").placeholder =
      "Search";
  }, []);

  return (
    <Box css={CSS}>
      <Picker onEmojiClick={(_, emoji) => onChange(emoji.emoji)} native />
    </Box>
  );
}

export default React.memo(EmojiPicker);

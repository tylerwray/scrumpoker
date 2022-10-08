import React, { useState } from "react";
import { useChannel, useSubscription, usePresenceSync } from "./socket";
import { PlayerSelection } from "../types";
import { Box, Button, Grid, Heading } from "@chakra-ui/react";
import { Card } from "./Card";
import { presetCardColorsHash, presetCardColors } from "../settings";
import { FiEyeOff, FiEye } from "react-icons/fi";

type Selections = { [key: string]: PlayerSelection };

type Props = {
  code: string;
  generateNewCode(): void;
};

export function HostGrid(props: Props) {
  const { code, generateNewCode } = props;

  const [isResultsShown, setIsResultsShown] = useState(false);
  const [selections, setSelections] = useState<Selections>({
    "d6ee1631-53e4-4acd-81e0-f526ba7ba02d": {
      id: "d6ee1631-53e4-4acd-81e0-f526ba7ba02d",
      value: "3",
      cardColorSlug: presetCardColors[0].slug,
      name: "Andrei",
    },
    "7f857bca-006f-47bd-bc2a-3128103ad1df": {
      id: "6bd14ac7-490a-4358-8943-a6f3eac4a368",
      value: "144",
      cardColorSlug: presetCardColors[1].slug,
      name: "TWray",
    },
    "32f7a8ff-cd3e-44b5-95a9-fbdbe348c82f": {
      id: "32f7a8ff-cd3e-44b5-95a9-fbdbe348c82f",
      value: "16",
      cardColorSlug: presetCardColors[2].slug,
      name: "Prithvi",
    },
    "380d7d0e-05cb-4f76-8ea2-75e4ac586bff": {
      id: "380d7d0e-05cb-4f76-8ea2-75e4ac586bff",
      value: "2",
      cardColorSlug: presetCardColors[3].slug,
      name: "Gavin",
    },
    "d3b51295-3049-48ae-a04a-a383dfe30d44": {
      id: "d3b51295-3049-48ae-a04a-a383dfe30d44",
      value: "8",
      cardColorSlug: presetCardColors[4].slug,
      name: "Kiley",
    },
    "419c560d-25c5-458c-a27f-0c49324a48ef": {
      id: "419c560d-25c5-458c-a27f-0c49324a48ef",
      value: "13",
      cardColorSlug: presetCardColors[5].slug,
      name: "Gui",
    },
    "4d7b58e9-2367-47a0-b464-c0d6ad190504": {
      id: "4d7b58e9-2367-47a0-b464-c0d6ad190504",
      value: "21",
      cardColorSlug: presetCardColors[4].slug,
      name: "Landon",
    },
    "d609fdc6-f326-4c43-bc6a-34ffb53e3680": {
      id: "d609fdc6-f326-4c43-bc6a-34ffb53e3680",
      value: "8",
      cardColorSlug: presetCardColors[3].slug,
      name: "Abby",
    },
    "46531778-1c3c-4ec6-a3ea-f7d9370f85f9": {
      id: "46531778-1c3c-4ec6-a3ea-f7d9370f85f9",
      value: "3",
      cardColorSlug: presetCardColors[2].slug,
      name: "Airie",
    },
    "476959d3-ea76-4091-8ae7-c0a29cfa313b": {
      id: "476959d3-ea76-4091-8ae7-c0a29cfa313b",
      value: "34",
      cardColorSlug: presetCardColors[1].slug,
      name: "Jim",
    },
    "b4f6355a-b269-440e-91da-ee25f385240f": {
      id: "b4f6355a-b269-440e-91da-ee25f385240f",
      value: "144",
      cardColorSlug: presetCardColors[0].slug,
      name: "Alec",
    },
  });

  const channelTopic = `scrum_poker:${code}`;

  const { channel } = useChannel(channelTopic);

  useSubscription({
    channel,
    event: "card.selected",
    callback: (selection: PlayerSelection) => {
      setSelections({ ...selections, [selection.id]: selection });
    },
  });

  usePresenceSync({
    channel,
    onJoin: (userUuid) => {
      console.log("join", userUuid);
    },
    onLeave: (userUuid) => {
      delete selections[userUuid];
      setSelections(selections);
    },
  });

  function handleShowResults() {
    setIsResultsShown((x) => !x);
  }

  function handleHostNewGame() {
    generateNewCode();
    setSelections({});
  }

  return (
    <Box>
      <Heading as="h2" size="md" fontWeight="light" textAlign="center">
        Game Code
      </Heading>
      <Heading as="h1" textAlign="center">
        {code}
      </Heading>
      <Grid py="8" templateColumns="1fr 1fr" gap="4">
        <Button
          onClick={handleShowResults}
          leftIcon={isResultsShown ? <FiEye /> : <FiEyeOff />}
        >
          Toggle Results
        </Button>
        <Button variant="ghost" onClick={handleHostNewGame}>
          Host new game
        </Button>
      </Grid>
      <Grid templateColumns="repeat(4, 1fr)" gap="12">
        {Object.values(selections).map((x) => (
          <Grid key={x.id} gap="1">
            <Card
              size="md"
              cardColor={presetCardColorsHash[x.cardColorSlug]}
              value={x.value}
              isFlipped={isResultsShown}
            />
            <Box textAlign="center">{x.name}</Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

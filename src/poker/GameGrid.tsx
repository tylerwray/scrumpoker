import React, { useCallback, useState } from "react";
import { useChannel, useSubscription, usePresenceSync } from "./socket";
import { Player, PlayerSelection } from "../types";
import { Box, Button, Grid, Heading, Spinner } from "@chakra-ui/react";
import { Card } from "./Card";
import { presetCardColorsHash, presetCardColors } from "../settings";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { storage } from "./storage";

const testData: Selections = {
  "d6ee1631-53e4-4acd-81e0-f526ba7ba02d": {
    id: "d6ee1631-53e4-4acd-81e0-f526ba7ba02d",
    value: "3",
    cardColor: presetCardColors[0],
    name: "Andrei",
  },
  "7f857bca-006f-47bd-bc2a-3128103ad1df": {
    id: "6bd14ac7-490a-4358-8943-a6f3eac4a368",
    value: "144",
    cardColor: presetCardColors[1],
    name: "TWray",
  },
  "32f7a8ff-cd3e-44b5-95a9-fbdbe348c82f": {
    id: "32f7a8ff-cd3e-44b5-95a9-fbdbe348c82f",
    value: "16",
    cardColor: presetCardColors[2],
    name: "Prithvi",
  },
  "380d7d0e-05cb-4f76-8ea2-75e4ac586bff": {
    id: "380d7d0e-05cb-4f76-8ea2-75e4ac586bff",
    value: "2",
    cardColor: presetCardColors[3],
    name: "Gavin",
  },
  "d3b51295-3049-48ae-a04a-a383dfe30d44": {
    id: "d3b51295-3049-48ae-a04a-a383dfe30d44",
    value: "8",
    cardColor: presetCardColors[4],
    name: "Kiley",
  },
  "419c560d-25c5-458c-a27f-0c49324a48ef": {
    id: "419c560d-25c5-458c-a27f-0c49324a48ef",
    value: "13",
    cardColor: presetCardColors[5],
    name: "Gui",
  },
  "4d7b58e9-2367-47a0-b464-c0d6ad190504": {
    id: "4d7b58e9-2367-47a0-b464-c0d6ad190504",
    value: "21",
    cardColor: presetCardColors[4],
    name: "Landon",
  },
  "d609fdc6-f326-4c43-bc6a-34ffb53e3680": {
    id: "d609fdc6-f326-4c43-bc6a-34ffb53e3680",
    value: "8",
    cardColor: presetCardColors[3],
    name: "Abby",
  },
  "46531778-1c3c-4ec6-a3ea-f7d9370f85f9": {
    id: "46531778-1c3c-4ec6-a3ea-f7d9370f85f9",
    value: "3",
    cardColor: presetCardColors[2],
    name: "Airie",
  },
  "476959d3-ea76-4091-8ae7-c0a29cfa313b": {
    id: "476959d3-ea76-4091-8ae7-c0a29cfa313b",
    value: "34",
    cardColor: presetCardColors[1],
    name: "Jim",
  },
  "b4f6355a-b269-440e-91da-ee25f385240f": {
    id: "b4f6355a-b269-440e-91da-ee25f385240f",
    value: "144",
    cardColor: presetCardColors[0],
    name: "Alec",
  },
};

type Selections = { [playerId: string]: PlayerSelection };
type Players = { [playerId: string]: Player };

export function GameGrid() {
  const [isResultsShown, setIsResultsShown] = useState(false);
  const [selections, setSelections] = useState<Selections>({});
  const [players, setPlayers] = useState<Players>({});

  const code = storage.getCode();
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
    callback: (syncPlayers: Player[]) => {
      const newPlayers = syncPlayers.reduce<Players>((prev, current) => {
        if (current.id === storage.getPlayerId()) return prev;
        prev[current.id] = current;
        return prev;
      }, {});

      const playerIds = syncPlayers.map((x) => x.id);
      setSelections(pick(selections, playerIds));
      setPlayers(newPlayers);
    },
  });

  function handleShowResults() {
    setIsResultsShown((x) => !x);
  }

  return (
    <Box>
      <Heading as="h2" size="md" fontWeight="light" textAlign="center">
        Game Code
      </Heading>
      <Heading as="h1" textAlign="center">
        {code}
      </Heading>

      <Box py="8" textAlign="center">
        <Button
          onClick={handleShowResults}
          leftIcon={isResultsShown ? <FiEye /> : <FiEyeOff />}
        >
          Toggle Results
        </Button>
      </Box>
      <Grid templateColumns="repeat(4, 1fr)" gap="12">
        {Object.values(players).map((x) => {
          const selection = selections[x.id];

          return (
            <Grid key={x.id} gap="1">
              {selection ? (
                <Card
                  size="md"
                  cardColor={selection.cardColor || presetCardColors[0]}
                  value={selection.value || ""}
                  isFlipped={isResultsShown}
                />
              ) : (
                <Grid
                  w="32"
                  h="48"
                  alignContent="center"
                  justifyContent="center"
                >
                  <Spinner size="xl" speed="0.75s" />
                </Grid>
              )}
              <Box textAlign="center">{x.name}</Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

function pick(obj: any, keys: string[]) {
  const ret: { [key: string]: any } = {};
  for (const key of keys) {
    if (key in obj) {
      ret[key] = obj[key];
    }
  }
  return ret;
}

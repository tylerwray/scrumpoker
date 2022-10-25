import React, { useState } from "react";
import { useChannel, useSubscription, usePresenceSync } from "./socket";
import { Player, PlayerSelection } from "../types";
import { Box, Button, Grid, Heading } from "@chakra-ui/react";
import { Card } from "./Card";
import { presetCardColors } from "../settings";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { storage } from "./storage";
import Waiting from "./Waiting";

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
                  <Waiting />
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

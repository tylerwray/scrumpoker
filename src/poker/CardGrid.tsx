import React from "react";
import { useSettings } from "../settings";
import { Center, Grid } from "@chakra-ui/react";
import { Card } from "./Card";
import { useState } from "react";
import { storage } from "../poker/storage";
import { useChannel } from "./socket";
import { PlayerSelection } from "../types";

export function CardGrid() {
  const { cards, cardColor } = useSettings();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { name } = storage.useName();
  const { code } = storage.useCode();

  const channelTopic = `scrum_poker:${code}`;

  const { channel } = useChannel(channelTopic);

  function handleClick(card: string) {
    setSelectedCard(card);

    const selection: PlayerSelection = {
      cardColorSlug: cardColor.slug,
      id: storage.getPlayerId(),
      name,
      value: card,
    };

    if (channel) {
      channel
        .push("card.selected", selection)
        .receive("ok", (payload) => console.log("phoenix replied:", payload))
        .receive("error", (err) => console.log("phoenix errored", err));
    }
  }

  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(80px, 1fr))"
      gap="8"
      px="4"
      w="full"
      maxW="lg"
      m="0 auto"
    >
      {cards.map((card) => (
        <Center key={card}>
          <Card
            size="sm"
            cardColor={cardColor}
            onClick={handleClick}
            isSelected={card === selectedCard}
            value={card}
          />
        </Center>
      ))}
    </Grid>
  );
}

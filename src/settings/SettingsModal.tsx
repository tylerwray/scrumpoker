import React from "react";
import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
  Center,
} from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";
import { Card } from "../poker";
import { presetCardColors, presetCardSequences } from "./constants";
import { useSettings } from "./SettingsContext";

import { RadioGroup } from "./RadioGroup";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function SettingsModal({ isOpen, onClose }: Props) {
  const size = useBreakpointValue({
    base: "full",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

  const {
    cardColor,
    cardSequence,
    iDontKnowCard,
    tiredCard,
    setCardColor,
    setCardSequence,
    setIDontKnowCard,
    setTiredCard,
  } = useSettings();

  const cardColorOptions = Object.keys(presetCardColors);

  function handleCardColorChange(slug: string) {
    const cardColor = presetCardColors[slug];
    setCardColor(cardColor);
  }

  function handleCardColorHexChange(value: string) {
    setCardColor({ front: value, back: value, name: "Custom", slug: "custom" });
  }

  const cardSequenceOptions = Object.keys(presetCardSequences);

  function handleSetCardSequence(slug: string) {
    const cardSequence = presetCardSequences[slug];
    setCardSequence(cardSequence);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex justify="center" my="12">
            <Card size="sm">144</Card>
          </Flex>

          <RadioGroup
            name="card-color"
            options={cardColorOptions}
            defaultValue={cardColor.slug}
            onChange={handleCardColorChange}
            label="Card color"
          >
            {(slug) => {
              const colorMix = presetCardColors[slug];

              return (
                <Flex direction="column" justify="center" align="center">
                  <Box
                    bgGradient={colorMix.front}
                    bg={colorMix.front}
                    w="12"
                    h="12"
                    borderRadius="lg"
                  />
                  <Box textAlign="center">{colorMix.name}</Box>
                </Flex>
              );
            }}
          </RadioGroup>

          <Center mb="12">
            <HexColorPicker
              color={cardColor.front}
              onChange={handleCardColorHexChange}
            />
          </Center>

          <RadioGroup
            name="card-sequence"
            options={cardSequenceOptions}
            defaultValue={cardSequence.slug}
            onChange={handleSetCardSequence}
            label="Card sequence"
          >
            {(slug) => {
              const sequence = presetCardSequences[slug];

              return (
                <Flex direction="column" justify="center" align="center">
                  <Box mb="2">{sequence.values.join(", ")}</Box>
                  <Box>{sequence.name}</Box>
                </Flex>
              );
            }}
          </RadioGroup>

          <RadioGroup
            name="i-dont-know-card"
            options={["🤷‍♀️", "🤷🏻‍♂️", "🤔"]}
            defaultValue={iDontKnowCard}
            onChange={setIDontKnowCard}
            label="I don't know card"
          >
            {(idkCard) => (
              <Flex direction="column" justify="center" align="center">
                <Box fontSize="4xl">{idkCard}</Box>
              </Flex>
            )}
          </RadioGroup>

          <RadioGroup
            name="tired-card"
            options={["🥱", "☕️", "😴"]}
            defaultValue={tiredCard}
            onChange={setTiredCard}
            label="Tired card"
          >
            {(tiredCard) => (
              <Flex direction="column" justify="center" align="center">
                <Box fontSize="4xl">{tiredCard}</Box>
              </Flex>
            )}
          </RadioGroup>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

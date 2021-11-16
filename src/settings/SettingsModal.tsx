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
import { RgbaStringColorPicker } from "react-colorful";
import { Card } from "../poker";
import { presetCardColors, presetCardSequences } from "./constants";
import { useSettings } from "./SettingsContext";

import { RadioGroup } from "./RadioGroup";
import { presetCardColorsHash, presetCardSequencesHash } from ".";

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

  const cardColorOptions = presetCardColors.map((x) => x.slug);

  function handleCardColorChange(slug: string) {
    const cardColor = presetCardColorsHash[slug];
    setCardColor(cardColor);
  }

  function handleCardColorHexChange(value: string) {
    setCardColor({ front: value, back: value, name: "Custom", slug: "custom" });
  }

  const cardSequenceOptions = presetCardSequences.map((x) => x.slug);

  function handleSetCardSequence(slug: string) {
    const cardSequence = presetCardSequencesHash[slug];
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
            value={cardColor.slug}
            onChange={handleCardColorChange}
            label="Card color"
          >
            {(slug) => {
              const colorMix = presetCardColorsHash[slug];

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

          <Box mb="12" w="full">
            <RgbaStringColorPicker
              style={{ width: "auto" }}
              color={cardColor.front}
              onChange={handleCardColorHexChange}
            />
          </Box>

          <RadioGroup
            name="card-sequence"
            options={cardSequenceOptions}
            value={cardSequence.slug}
            onChange={handleSetCardSequence}
            label="Card sequence"
          >
            {(slug) => {
              const sequence = presetCardSequencesHash[slug];

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
            value={iDontKnowCard}
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
            value={tiredCard}
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

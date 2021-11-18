import React, { Suspense } from "react";
import {
  Box,
  Button,
  Center,
  Collapse,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { Card } from "../poker";
import {
  presetCardColors,
  presetCardSequences,
  presetCardColorsHash,
  presetCardSequencesHash,
} from "./constants";
import { useSettings } from "./SettingsContext";
import { ColorPicker } from "./ColorPicker";

import { RadioGroup } from "./RadioGroup";

const EmojiPicker = React.lazy(() => import("./EmojiPicker"));

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

  const isCustomColor = cardColor.slug === "custom";

  const {
    isOpen: isCustomColorPickerOpen,
    onClose: onCloseCustomColorPicker,
    onToggle: onToggleCustomColorPicker,
  } = useDisclosure({
    defaultIsOpen: isCustomColor,
  });

  const cardColorOptions = presetCardColors.map((x) => x.slug);

  function handleCardColorChange(slug: string) {
    const cardColor = presetCardColorsHash[slug];
    setCardColor(cardColor);
    onCloseCustomColorPicker();
  }

  function handleCustomCardColorChange(value: string) {
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
        <ModalBody paddingInline="4">
          <Flex justify="center" my="12">
            <Card size="sm">144</Card>
          </Flex>

          <RadioGroup
            name="card-color"
            options={cardColorOptions}
            value={cardColor.slug}
            onChange={handleCardColorChange}
            label="Card color"
            mb="4"
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

          <Center mb="4">
            <Button
              colorScheme="purple"
              variant="outline"
              leftIcon={<EditIcon />}
              onClick={() => {
                if (!isCustomColor) {
                  handleCustomCardColorChange("rgba(128, 90, 213, 1)");
                }
                onToggleCustomColorPicker();
              }}
            >
              Custom
            </Button>
          </Center>

          <Collapse in={isCustomColorPickerOpen}>
            <Box mb="12" w="full">
              <ColorPicker
                onChange={handleCustomCardColorChange}
                defaultValue={cardColor.front}
              />
            </Box>
          </Collapse>

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

          <Heading as="h2" size="md" mb="4">
            I don't know card
          </Heading>

          <Flex mb="4" justify="space-evenly" align="center">
            <Card size="sm">{iDontKnowCard}</Card>
            <Popover placement="top-end" isLazy>
              <PopoverTrigger>
                <Button
                  colorScheme="purple"
                  variant="outline"
                  leftIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </PopoverTrigger>
              <PopoverContent w="unset">
                <Suspense fallback="">
                  <EmojiPicker onChange={setIDontKnowCard} />
                </Suspense>
              </PopoverContent>
            </Popover>
          </Flex>

          <Heading as="h2" size="md" mb="4">
            Tired card
          </Heading>

          <Flex mb="4" justify="space-evenly" align="center">
            <Card size="sm">{tiredCard}</Card>
            <Popover placement="top-end" isLazy>
              <PopoverTrigger>
                <Button
                  colorScheme="purple"
                  variant="outline"
                  leftIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </PopoverTrigger>
              <PopoverContent w="unset">
                <Suspense fallback="">
                  <EmojiPicker onChange={setTiredCard} />
                </Suspense>
              </PopoverContent>
            </Popover>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

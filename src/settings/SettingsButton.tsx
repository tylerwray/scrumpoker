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
  IconButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Card } from "../poker";
import {
  useSettings,
  CardSequence,
  CardColor,
  cardColorDescriptions,
  cardSequenceDescriptions,
  IDontKnowCard,
  iDontKnowCardDescriptions,
  TiredCard,
  tiredCardDescriptions,
} from ".";

import { SettingsIcon } from "@chakra-ui/icons";
import { RadioGroup } from "./RadioGroup";

export function SettingsButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const size = useBreakpointValue({
    base: "full",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

  const {
    tiredCard,
    setTiredCard,
    iDontKnowCard,
    setIDontKnowCard,
    cardSequence,
    setCardSequence,
    cardColor,
    setCardColor,
  } = useSettings();

  // TODO: Get dark/light mode working then we can show a nice update toast when we ship the udpate.
  // const toast = useToast();
  // const key = true; // localStorage.getItem("info-toast-dismissed");

  // useEffect(() => {
  //   if (!key) {
  //     setTimeout(
  //       () =>
  //         toast({
  //           isClosable: true,
  //           title: "Updates",
  //           onCloseComplete: () => {
  //             // localStorage.setItem("info-toast-dismissed", "true");
  //           },
  //           description: (
  //             <>
  //               Check out what's new{" "}
  //               <Button
  //                 color="black"
  //                 variant="link"
  //                 textDecor="underline"
  //                 onClick={onOpen}
  //               >
  //                 in settings!
  //               </Button>
  //             </>
  //           ),
  //         }),
  //       200
  //     );
  //   }
  // }, [key]);

  return (
    <>
      <IconButton
        variant="ghost"
        size="lg"
        onClick={onOpen}
        aria-label="settings"
        icon={<SettingsIcon boxSize={7} />}
      />
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify="center" my="12">
              <Card size="sm">144</Card>
            </Flex>

            <RadioGroup<CardColor>
              name="card-color"
              options={Object.values(CardColor)}
              defaultValue={cardColor}
              onChange={setCardColor}
              label="Card color"
            >
              {(color) => (
                <Flex direction="column" justify="center" align="center">
                  <Box bg={color} w="12" h="12" borderRadius="lg" />
                  <Box>{cardColorDescriptions[color]}</Box>
                </Flex>
              )}
            </RadioGroup>

            <RadioGroup<CardSequence>
              name="card-sequence"
              options={Object.values(CardSequence)}
              defaultValue={cardSequence}
              onChange={setCardSequence}
              label="Card sequence"
            >
              {(sequence) => (
                <Flex direction="column" justify="center" align="center">
                  <Box>{cardSequenceDescriptions[sequence]}</Box>
                  <Box>{sequence}</Box>
                </Flex>
              )}
            </RadioGroup>

            <RadioGroup<IDontKnowCard>
              name="i-dont-know-card"
              options={Object.values(IDontKnowCard)}
              defaultValue={iDontKnowCard}
              onChange={setIDontKnowCard}
              label="I don't know card"
            >
              {(idkCard) => (
                <Flex direction="column" justify="center" align="center">
                  <Box fontSize="4xl">{idkCard}</Box>
                  <Box textAlign="center">
                    {iDontKnowCardDescriptions[idkCard]}
                  </Box>
                </Flex>
              )}
            </RadioGroup>

            <RadioGroup<TiredCard>
              name="tired-card"
              options={Object.values(TiredCard)}
              defaultValue={tiredCard}
              onChange={setTiredCard}
              label="Tired card"
            >
              {(tiredCard) => (
                <Flex direction="column" justify="center" align="center">
                  <Box fontSize="4xl">{tiredCard}</Box>
                  <Box textAlign="center">
                    {tiredCardDescriptions[tiredCard]}
                  </Box>
                </Flex>
              )}
            </RadioGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

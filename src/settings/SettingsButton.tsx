import React from "react";
import {
  Box,
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
import { Card } from "../card";
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
  Select,
} from ".";

import { SettingsIcon } from "@chakra-ui/icons";

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
            <div className="flex justify-center my-12">
              <Card size="sm">144</Card>
            </div>

            <Select initialValue={cardColor} onChange={setCardColor}>
              <Select.Label>Color</Select.Label>
              <Select.Body>
                {Object.values(CardColor).map((key) => (
                  <Select.Option value={key} key={key}>
                    <div className="flex flex-col justify-center items-center px-8 py-6 text-center px-8 py-6">
                      <Box bg={key} className={`rounded-lg h-12 w-12`} />
                      <div className="mt-3">{cardColorDescriptions[key]}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select.Body>
            </Select>

            <Select initialValue={cardSequence} onChange={setCardSequence}>
              <Select.Label>Card Sequence</Select.Label>
              <Select.Body>
                {Object.values(CardSequence).map((key) => (
                  <Select.Option value={key} key={key}>
                    <div className="p-6">
                      <h4>{cardSequenceDescriptions[key]}</h4>
                      <span>{key}</span>
                    </div>
                  </Select.Option>
                ))}
              </Select.Body>
            </Select>

            <Select initialValue={iDontKnowCard} onChange={setIDontKnowCard}>
              <Select.Label>I don&apos;t know card</Select.Label>
              <Select.Body>
                {Object.values(IDontKnowCard).map((key) => (
                  <Select.Option value={key} key={key}>
                    <div className="flex flex-col justify-center items-center px-8 py-6 text-center px-8 py-6">
                      <div className="text-4xl">{key}</div>
                      <div className="mt-3">
                        {iDontKnowCardDescriptions[key]}
                      </div>
                    </div>
                  </Select.Option>
                ))}
              </Select.Body>
            </Select>

            <Select initialValue={tiredCard} onChange={setTiredCard}>
              <Select.Label>Tired card</Select.Label>
              <Select.Body>
                {Object.values(TiredCard).map((key) => (
                  <Select.Option value={key} key={key}>
                    <div className="flex flex-col justify-center items-center px-8 py-6 text-center px-8 py-6">
                      <div className="text-4xl">{key}</div>
                      <div className="mt-3">{tiredCardDescriptions[key]}</div>
                    </div>
                  </Select.Option>
                ))}
              </Select.Body>
            </Select>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

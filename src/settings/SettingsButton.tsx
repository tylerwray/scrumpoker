import React from "react";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { SettingsModal } from "./SettingsModal";

export function SettingsButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <SettingsModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

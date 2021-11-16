import React from "react";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { SettingsIcon } from "@chakra-ui/icons";
import { SettingsModal } from "./SettingsModal";

export function SettingsButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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

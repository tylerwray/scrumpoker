import React, { ReactNode } from "react";
import { Link } from "gatsby";

import {
  Center,
  HStack,
  Spacer,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowBackIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

import { SettingsProvider, SettingsButton } from "../settings";
import SEO from "./seo";

type Props = {
  children: ReactNode;
  title: string;
  showBack?: boolean;
};

const ICON_SIZE = 7;

// THOUGHT: Should layout be put in WrapRootElement?
function Layout({ children, title, showBack = false }: Props) {
  const { toggleColorMode } = useColorMode();
  const ColorModeIcon = useColorModeValue(MoonIcon, SunIcon);

  return (
    <SettingsProvider>
      <SEO title={title} />
      <HStack p="4">
        {showBack && (
          <IconButton
            variant="ghost"
            size="lg"
            icon={<ArrowBackIcon boxSize={ICON_SIZE} />}
            as={Link}
            aria-label="back"
            to="/"
          />
        )}
        <Spacer />
        {/* Move to settings Page */}
        <IconButton
          variant="ghost"
          size="lg"
          aria-label="Color mode toggle"
          icon={<ColorModeIcon boxSize={ICON_SIZE} />}
          onClick={toggleColorMode}
        />
        <SettingsButton />
      </HStack>
      <Center as="main">{children}</Center>
    </SettingsProvider>
  );
}

export default Layout;

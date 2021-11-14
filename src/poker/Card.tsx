import React, { ReactNode } from "react";
import { Flex, Box, useColorMode } from "@chakra-ui/react";
import { useSettings, cardColorBackgrounds } from "../settings";
import "./card.css";

const noop = () => null;

type BaseProps = {
  children?: ReactNode;
  onClick(): void;
  className: string;
  bg: string;
};

function Base(props: BaseProps) {
  return (
    <Flex
      justify="center"
      align="center"
      position="absolute"
      w="full"
      h="full"
      color="white"
      borderRadius="8"
      cursor="pointer"
      bgGradient={props.bg}
      {...props}
    />
  );
}

type CardProps = {
  children: ReactNode;
  isFlipped?: boolean;
  onClick?(): void;
  size?: "sm" | "lg";
};

export function Card(props: CardProps) {
  const { children, isFlipped = true, onClick = noop, size = "lg" } = props;

  const { cardColor } = useSettings();
  const { colorMode } = useColorMode();

  let color = cardColorBackgrounds[colorMode][cardColor];

  // TODO: Look into animating this with framer motion
  return (
    <Box className="scene">
      <SizedCard size={size} isFlipped={isFlipped} className="card">
        <Base onClick={onClick} bg={color.back} className="card-face" />
        <Base
          onClick={onClick}
          bg={color.front}
          className="card-face card-front"
        >
          {children}
        </Base>
      </SizedCard>
    </Box>
  );
}

type SizedCardProps = {
  size: "sm" | "lg";
  className: string;
  isFlipped: boolean;
  children: ReactNode;
};

const SIZES = {
  sm: { w: 16, h: 24, fontSize: "3xl" },
  lg: { w: 80, h: 96, fontSize: "huge" },
};

function SizedCard({ size, className, isFlipped, children }: SizedCardProps) {
  return (
    <Box
      className={`${className} ${isFlipped ? "is-flipped" : ""}`}
      {...SIZES[size]}
    >
      {children}
    </Box>
  );
}

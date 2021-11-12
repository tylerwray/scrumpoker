import React, { ReactNode } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { useSettings } from "../settings";
import "./card.css";

const noop = () => null;

const SIZES = {
  sm: "w-16 h-24 text-3xl",
  lg: "w-80 h-96 text-huge",
};

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
      border="2px"
      borderRadius="8"
      cursor="pointer"
      bgGradient={props.bg}
      {...props}
    />
  );
}

type CardProps = {
  children: ReactNode;
  revealed?: boolean;
  onClick?(): void;
  size?: "sm" | "lg";
};

export function Card(props: CardProps) {
  const { children, revealed = true, onClick = noop, size = "lg" } = props;
  const { cardColor } = useSettings();
  const isFlipped = revealed ? "is-flipped" : "";

  return (
    <Box className="scene">
      <Box className={`card ${SIZES[size]} ${isFlipped}`}>
        <Base onClick={onClick} bg={cardColor} className="card-face" />
        <Base onClick={onClick} bg={cardColor} className="card-face card-back">
          {children}
        </Base>
      </Box>
    </Box>
  );
}

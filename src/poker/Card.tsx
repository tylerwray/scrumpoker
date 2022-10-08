import React, { ReactNode } from "react";
import { Flex, Box } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { CardColor } from "../types";
import "./card.css";

const noop = () => null;

type BaseProps = {
  children?: ReactNode;
  onClick(): void;
  className: string;
  bg: string;
  borderColor?: string;
  borderWidth?: string;
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
  isFlipped?: boolean;
  isSelected?: boolean;
  onClick?(card: string): void;
  cardColor: CardColor
  size?: "sm" | "md" | "lg";
  value: string;
};

export function Card(props: CardProps) {
  const {
    isFlipped = true,
    isSelected = false,
    onClick = noop,
    size = "lg",
    cardColor,
    value,
  } = props;

  function handleClick() {
    onClick(value);
  }

  // TODO: Look into animating this with framer motion
  return (
    <Box className="scene">
      <SizedCard size={size} isFlipped={isFlipped} className="card">
        <Base onClick={handleClick} bg={cardColor.back} className="card-face" />
        <Base
          onClick={handleClick}
          bg={cardColor.front}
          className="card-face card-front"
          borderColor="green.500"
          borderWidth={isSelected ? "4px" : ""}
        >
          {isSelected && (
            <CheckIcon
              w="4"
              h="4"
              bg="green.500"
              rounded="full"
              position="absolute"
              top="1"
              right="1"
              p="2px"
            />
          )}
          {value}
        </Base>
      </SizedCard>
    </Box>
  );
}

type SizedCardProps = {
  size: "sm" | "md" | "lg";
  className: string;
  isFlipped: boolean;
  children: ReactNode;
};

const SIZES = {
  sm: { w: 16, h: 24, fontSize: "3xl" },
  md: { w: 32, h: 48, fontSize: "6xl" },
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

import React, { ReactNode, MouseEvent } from "react";
import { CardColor } from "../settings";
import "./card.css";

const BASE =
  "absolute w-full h-full text-white border-white rounded-lg border-2 cursor-pointer focus:outline-none focus:ring flex justify-center items-center";

const SIZES = {
  sm: "w-16 h-24 text-3xl",
  lg: "w-80 h-96 text-huge",
};

type Props = {
  children: ReactNode;
  revealed?: boolean;
  onClick?(event: MouseEvent<HTMLDivElement>): void;
  size?: "sm" | "lg";
  color?: CardColor;
};

function Card({
  children,
  revealed = true,
  onClick,
  size = "lg",
  color,
}: Props) {
  const isFlipped = revealed ? "is-flipped" : "";

  return (
    <div className={`scene`}>
      <div onClick={onClick} className={`card ${SIZES[size]} ${isFlipped}`}>
        <div className={`card-face ${BASE} ${color}`} />
        <div className={`card-face card-back ${BASE} ${color}`}>{children}</div>
      </div>
    </div>
  );
}

export default Card;

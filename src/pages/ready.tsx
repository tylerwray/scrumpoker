import React, { useState } from "react";
import { navigate, PageRendererProps } from "gatsby";

import Card from "../components/card";
import Layout from "../components/layout";
import useCardColor from "../hooks/useCardColor";

const Ready = ({ location }: PageRendererProps) => {
  const [color] = useCardColor();
  const [cardRevealed, setCardRevealed] = useState(false);

  if (location.state?.value == null) {
    try {
      navigate("/");
    } catch (e) {
      // Supress window not found errors
    }
    return null;
  }

  function toggleCard() {
    setCardRevealed(v => !v);
  }

  return (
    <Layout showBack>
      <div
        style={{ height: "70vh" }}
        className=" flex justify-center items-center"
      >
        <Card color={color} revealed={cardRevealed} onClick={toggleCard}>
          {location.state?.value}
        </Card>
      </div>
    </Layout>
  );
};

export default Ready;

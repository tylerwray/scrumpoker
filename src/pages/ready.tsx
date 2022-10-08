import React, { useState } from "react";
import { navigate, PageProps } from "gatsby";

import { Card } from "../poker";
import Layout from "../layout/layout";
import { Box } from "@chakra-ui/react";
import { useSettings } from "../settings";

type Props = PageProps<object, object, { value: string }>;

const Ready = ({ location }: Props) => {
  const [cardIsFlipped, setCardIsFlipped] = useState(false);
  const { cardColor } = useSettings();

  if (location.state?.value == null) {
    try {
      navigate("/");
    } catch (e) {
      // Supress window not found errors
    }
    return null;
  }

  function toggleCard() {
    setCardIsFlipped((v) => !v);
  }

  return (
    <Layout showBack title="Ready">
      <Box pt="20">
        <Card
          isFlipped={cardIsFlipped}
          onClick={toggleCard}
          cardColor={cardColor}
          value={location.state?.value}
        />
      </Box>
    </Layout>
  );
};

export default Ready;

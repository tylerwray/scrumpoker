import React, { useState } from "react";
import { navigate, PageProps } from "gatsby";

import { Card } from "../poker";
import Layout from "../layout/layout";
import { Box } from "@chakra-ui/react";

type Props = PageProps<object, object, { value: string }>;

const Ready = ({ location }: Props) => {
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
    setCardRevealed((v) => !v);
  }

  return (
    <Layout showBack title="Ready">
      <Box pt="20">
        <Card revealed={cardRevealed} onClick={toggleCard}>
          {location.state?.value}
        </Card>
      </Box>
    </Layout>
  );
};

export default Ready;

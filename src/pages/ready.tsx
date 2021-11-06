import React, { useState } from "react";
import { navigate, PageProps } from "gatsby";

import Card from "../card";
import Layout from "../layout/layout";
import { useSettings } from "../settings";

type Props = PageProps<object, object, { value: string }>;

const Ready = ({ location }: Props) => {
  const { cardColor } = useSettings();
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
    <Layout title="Ready" showBack>
      <div
        style={{ height: "70vh" }}
        className="flex justify-center items-center"
      >
        <Card color={cardColor} revealed={cardRevealed} onClick={toggleCard}>
          {location.state?.value}
        </Card>
      </div>
    </Layout>
  );
};

export default Ready;

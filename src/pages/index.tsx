import React from "react";

import Layout from "../layout";
import { CardGrid } from "../card";
import { useSettings } from "../settings";

function IndexPage() {
  const { cardColor, cards } = useSettings();

  return (
    <Layout title="Home">
      <CardGrid />
    </Layout>
  );
}

export default IndexPage;

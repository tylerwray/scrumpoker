import React from "react";

import Layout from "../layout";
import { GameCenter } from "../poker";

function IndexPage() {
  return (
    <Layout title="Game Center">
      <GameCenter />
    </Layout>
  );
}

export default IndexPage;

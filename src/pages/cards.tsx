import React from "react";
import Layout from "../layout";
import { CardGrid } from "../poker";
import { PhoenixSocketProvider } from "../poker/socket";

function IndexPage() {
  return (
    <PhoenixSocketProvider>
      <Layout title="Cards" showBack>
        <CardGrid />
      </Layout>
    </PhoenixSocketProvider>
  );
}

export default IndexPage;

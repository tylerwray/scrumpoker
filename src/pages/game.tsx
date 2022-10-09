import React from "react";
import Layout from "../layout";
import { GameGrid } from "../poker/GameGrid";
import { PhoenixSocketProvider } from "../poker/socket";

function HostPage() {
  return (
    <PhoenixSocketProvider>
      <Layout title="Host" showBack>
        <GameGrid />
      </Layout>
    </PhoenixSocketProvider>
  );
}

export default HostPage;

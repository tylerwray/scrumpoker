import React from "react";
import Layout from "../layout";
import { HostGrid } from "../poker/HostGrid";
import { storage } from "../poker/storage";
import { PhoenixSocketProvider } from "../poker/socket";

function HostPage() {
  const { code, generateNewCode } = storage.useCode();

  if (!code) {
    generateNewCode();
    return null;
  }

  return (
    <PhoenixSocketProvider>
      <Layout title="Host" showBack>
        <HostGrid code={code} generateNewCode={generateNewCode} />
      </Layout>
    </PhoenixSocketProvider>
  );
}

export default HostPage;

import React from "react";
import { Link } from "gatsby";

import Layout from "../layout";
import Card from "../card";
import { useSettings } from "../settings";

function IndexPage() {
  const { cardColor, cardSequence, iDontKnowCard, tiredCard, sequenceToArray } =
    useSettings();

  return (
    <Layout title="Home">
      <div className="grid grid-fit-sm max-w-lg my-0 mx-auto">
        {sequenceToArray(cardSequence)
          .concat([iDontKnowCard, tiredCard])
          .map((value) => (
            <Link
              key={value}
              className="flex justify-center m-4"
              to="/ready/"
              state={{ value }}
            >
              <Card color={cardColor} size="sm">
                {value}
              </Card>
            </Link>
          ))}
      </div>
    </Layout>
  );
}

export default IndexPage;

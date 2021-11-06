import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Card from "../components/card";
import useCardColor from "../hooks/useCardColor";
import useCardSequence, { sequenceToArray } from "../hooks/useCardSequence";
import useIDontKnowCard from "../hooks/useIDontKnowCard";
import useTiredCard from "../hooks/useTiredCard";

function IndexPage() {
  const [color] = useCardColor();
  const [sequence] = useCardSequence();
  const [iDontKnowCard] = useIDontKnowCard();
  const [tiredCard] = useTiredCard();

  return (
    <Layout>
      <SEO title="Home" />
      <div className="grid grid-fit-sm max-w-lg my-0 mx-auto">
        {sequenceToArray(sequence)
          .concat([iDontKnowCard, tiredCard])
          .map(value => (
            <Link
              key={value}
              className="flex justify-center m-4"
              to="/ready/"
              state={{ value }}
            >
              <Card color={color} size="sm">
                {value}
              </Card>
            </Link>
          ))}
      </div>
    </Layout>
  );
}

export default IndexPage;

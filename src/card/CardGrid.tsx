import { useSettings } from "../settings";
import { Link } from "gatsby";
import { Center, Grid } from "@chakra-ui/react";
import { Card } from "./Card";

export function CardGrid() {
  const { cards } = useSettings();

  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(80px, 1fr))"
      gap="8"
      px="4"
      w="full"
      maxW="lg"
      m="0 auto"
    >
      {cards.map((value) => (
        <Center key={value} as={Link} to="/ready/" state={{ value }}>
          <Card size="sm">{value}</Card>
        </Center>
      ))}
    </Grid>
  );
}

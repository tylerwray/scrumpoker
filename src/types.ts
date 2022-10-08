export type CardColor = {
  slug: string;
  name: string;
  front: string;
  back: string;
};

export type CardSequence = { slug: string; name: string; values: string[] };

export type PlayerSelection = {
  cardColorSlug: string;
  id: string;
  name: string;
  value: string;
};

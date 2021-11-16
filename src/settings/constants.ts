export type CardColor = {
  slug: string;
  name: string;
  front: string;
  back: string;
};

const toHash = (prev, curr) => {
  prev[curr.slug] = curr;
  return prev;
};

export const presetCardColors: CardColor[] = [
  { slug: "red", name: "Red", front: "red.500", back: "red.500" },
  { slug: "yellow", name: "Yellow", front: "yellow.400", back: "yellow.400" },
  { slug: "green", name: "Green", front: "green.500", back: "green.500" },
  { slug: "blue", name: "Blue", front: "blue.500", back: "blue.500" },
  { slug: "purple", name: "Purple", front: "purple.500", back: "purple.500" },
  { slug: "purple", name: "Pink", front: "pink.300", back: "pink.300" },
  {
    slug: "pink_purple_fade",
    name: "Pink-Purple",
    front: "linear(to-r, pink.600, purple.700)",
    back: "linear(to-l, pink.600, purple.700)",
  },
  {
    slug: "orange-blue-circle",
    name: "Orange-Blue",
    front: "radial(orange.700, blue.600)",
    back: "radial(orange.700, blue.600)",
  },
  {
    slug: "orange-purple-fade",
    name: "Orange-Purple",
    front: "linear(to-b, orange.100, purple.300)",
    back: "linear(to-b, orange.100, purple.300)",
  },
  {
    slug: "yellow-red-fade",
    name: "Yellow-Red",
    front: "linear(to-r, yellow.600, red.700)",
    back: "linear(to-l, yellow.600, red.700)",
  },
  {
    slug: "teal-yellow-fade",
    name: "Teal-Yellow",
    front: "linear(to-tr, teal.300, yellow.400)",
    back: "linear(to-tl, teal.300, yellow.400)",
  },
  {
    slug: "red-green-fade",
    name: "Red-Green",
    front: "linear(to-br, red.300, green.400)",
    back: "linear(to-bl, red.300, green.400)",
  },
];

export const presetCardColorsHash: { [key: string]: CardColor } =
  presetCardColors.reduce(toHash, {});

export type CardSequence = { slug: string; name: string; values: string[] };

export const presetCardSequences: CardSequence[] = [
  {
    name: "Fibonacci",
    slug: "fibonacci",
    values: ["1", "2", "3", "5", "8", "13", "21", "34", "89", "144"],
  },
  {
    slug: "t_shirt_size",
    name: "T-Shirt size",
    values: ["XS", "SM", "MD", "LG", "XL"],
  },
  {
    slug: "linear",
    name: "Linear",
    values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
];

export const presetCardSequencesHash: { [key: string]: CardSequence } =
  presetCardSequences.reduce(toHash, {});

import { CardColor, CardSequence } from "../types";

function toHash(prev: any, curr: any) {
  prev[curr.slug] = curr;
  return prev;
}

export const presetCardColors: CardColor[] = [
  {
    slug: "pink_purple_fade",
    name: "Pink-Purple",
    front: "linear(to-r, pink.600, purple.700)",
    back: "linear(to-l, pink.600, purple.700)",
  },
  {
    slug: "orange_blue_circle",
    name: "Orange-Blue",
    front: "radial(orange.700, blue.400)",
    back: "radial(orange.700, blue.400)",
  },
  {
    slug: "orange_purple_fade",
    name: "Orange-Purple",
    front: "linear(to-b, orange.300, purple.400)",
    back: "linear(to-b, orange.300, purple.400)",
  },
  {
    slug: "yellow_red_fade",
    name: "Yellow-Red",
    front: "linear(to-r, yellow.500, red.600)",
    back: "linear(to-l, yellow.500, red.600)",
  },
  {
    slug: "teal_yellow_fade",
    name: "Teal-Yellow",
    front: "linear(to-tr, teal.400, yellow.400)",
    back: "linear(to-tl, teal.400, yellow.400)",
  },
  {
    slug: "red_green_fade",
    name: "Red-Green",
    front: "linear(to-br, red.300, green.400)",
    back: "linear(to-bl, red.300, green.400)",
  },
];

export const presetCardColorsHash: { [key: string]: CardColor } =
  presetCardColors.reduce(toHash, {});

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

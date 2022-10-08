import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: "https://scrumpoker.org",
    title: "Scrumpoker",
    description: "Help software teams better estimate their work",
    author: "@tylerwray",
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-react-helmet",
    "@chakra-ui/gatsby-plugin",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Scrumpoker",
        short_name: "Scrumpoker",
        start_url: "/",
        background_color: "#1A202C",
        theme_color: "#1A202C",
        display: "standalone",
        icon: "src/images/poker.png",
      },
    },
    "gatsby-plugin-offline",
  ],
};

export default config;

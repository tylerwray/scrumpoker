module.exports = {
  siteMetadata: {
    siteUrl: "https://scrumpoker.org",
    title: "Scrumpoker",
    description: "Help software teams better estimate their work",
    author: "@tylerwray",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "@chakra-ui/gatsby-plugin",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Scrumpoker",
        short_name: "Scrumpoker",
        start_url: "/",
        background_color: "#212121",
        theme_color: "#212121",
        display: "standalone",
        icon: "src/images/poker.png",
      },
    },
    "gatsby-plugin-offline",
  ],
};

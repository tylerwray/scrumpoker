module.exports = {
  siteMetadata: {
    siteUrl: "https://scrumpoker.org",
    title: "Scrumpoker",
    description: "Help software teams better estimate their work",
    author: "@tylerwray",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Scrumpoker",
        /* eslint-disable @typescript-eslint/camelcase */
        short_name: "Scrumpoker",
        start_url: "/",
        background_color: "#212121",
        theme_color: "#212121",
        /* eslint-enable @typescript-eslint/camelcase */
        display: "standalone",
        icon: "src/images/poker.png",
      },
    },
    "gatsby-plugin-offline"
  ],
};

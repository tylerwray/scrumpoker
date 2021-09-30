module.exports = {
  siteMetadata: {
    title: `Scrumpoker`,
    description: `Help software teams better estimate their work`,
    author: `@tylerwray`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Scrumpoker`,
        /* eslint-disable @typescript-eslint/camelcase */
        short_name: `Scrumpoker`,
        start_url: `/`,
        background_color: `#212121`,
        theme_color: `#212121`,
        /* eslint-enable @typescript-eslint/camelcase */
        display: `standalone`,
        icon: `src/images/poker.png`,
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-eslint`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        tailwind: true, // Enable tailwindcss support
      },
    },
  ],
};

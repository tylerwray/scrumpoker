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
        short_name: `Scrumpoker`,
        start_url: `/`,
        background_color: `#212121`,
        theme_color: `#212121`,
        display: `standalone`,
        icon: `src/images/poker.png`,
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        printRejected: true, // Print removed selectors and processed file names
        // develop: true, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
  ],
}
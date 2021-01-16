const repos = [
  {
    owner: "kiwicom",
    name: "the-zoo",
  },
  {
    owner: "eidam",
    name: "cf-workers-status-page",
  },
]

function generateQuery() {
  let query = ""
  for (repo of repos) {
    query += repoQuery(repo.owner, repo.name)
  }
  console.log(query)

  return `{${query}}`
}


module.exports = {
  siteMetadata: {
    title: `Cloudflare workers catalog`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        token: `${process.env.GITHUB_API_TOKEN}`,
        graphQLQuery: `
            query ($owner: String!, $name: String!) {
              repository(owner: $owner, name: $name) {
                description
                forkCount
                name
                homepageUrl
                owner {
                  login
                }
                repositoryTopics(first:100) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
                readme: object(expression: "HEAD:README.md") {
                  ... on Blob {
                    text
                  }
                }
              }
            }
          `,
        variables: [
          {
            owner: "eidam",
            name: "cf-workers-status-page"
          },
          {
            owner: "kiwicom",
            name: "the-zoo"
          }
        ]
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

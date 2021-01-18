const fs = require("fs")
const yaml = require("js-yaml")

// Shuffle repos on each build
// @ts-ignore
const repos = yaml.load(fs.readFileSync("./catalog.yaml", "utf-8"))

module.exports = {
  siteMetadata: {
    title: `Cloudflare Workers catalog`,
    description: `A simple Catalog of Cloudflare Workers GitHub projects`,
    author: `@eidam`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-material-ui",
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
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
                stargazerCount
                name
                owner {
                  login
                }
                repositoryTopics(first:2) {
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
        variables: repos,
      },
    },
    {
      resolve: "gatsby-plugin-local-search",
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: "repos",

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: "lunr",

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        //engineOptions: "speed",

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allGithubData(
              sort: { fields: [data___repository___stargazerCount, data___repository___forkCount], order: [DESC, DESC] }
            ) {
              nodes {
                id
                data {
                  repository {
                    name
                    description
                    forkCount
                    stargazerCount
                    owner {
                      login
                    }
                    repositoryTopics {
                      nodes {
                        topic {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: "id",

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ["name", "owner", "description"],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        //store: ['id', 'path', 'title'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ data }) =>
          data.allGithubData.nodes.map(node => ({
            id: node.id,
            owner: node.data.repository.owner.login,
            name: node.data.repository.name,
            description: node.data.repository.description,
            stars: node.data.repository.stargazerCount,
            forks: node.data.repository.forkCount,
            topics: node.data.repository.repositoryTopics.nodes.map(
              x => x.topic.name
            ),
          })),
      },
    },
    "gatsby-plugin-use-query-params",
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}

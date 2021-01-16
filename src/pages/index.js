import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { GridList, GridListTile } from "@material-ui/core"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Item from "../components/item"

export const pageQuery = graphql`
  query ItemsQuery {
    allGithubData {
      nodes {
        id
        data {
          repository {
            name
            description
            homepageUrl
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
`

const IndexPage = ({ data }) => {
  const items = []

  for (const item of data.allGithubData.nodes) {
    console.log(item)
    items.push(
      <GridListTile key={item.id} cols={1}>
        <Item
          name={item.data.repository.name}
          description={item.data.repository.description}
          owner={item.data.repository.owner.login}
          stars={item.data.repository.stargazerCount}
          forks={item.data.repository.forkCount}
          topics={item.data.repository.repositoryTopics.nodes}
        />
      </GridListTile>
    )
  }

  return (
    <Layout>
      <SEO title="Cloudflare Workers catalog" />
      <GridList
        cellHeight="auto"
        cols={1}
        spacing={8}
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        {items}
      </GridList>
    </Layout>
  )
}

export default IndexPage

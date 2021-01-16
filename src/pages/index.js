import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import {
  GridList,
  GridListTile,
} from '@material-ui/core'

import Layout from "../components/layout"
import Image from "../components/image"
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
            forkCount
            owner {
              login
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
    items.push(
      <GridListTile key={item.id} cols={1}>
        <Item
          name={item.data.repository.name}
          description={item.data.repository.description}
          owner={item.data.repository.owner.login}
          forks={item.data.repository.forkCount}
        />
      </GridListTile>
    )
  }

  return (
    <Layout>
      <SEO title="Home" />
      <GridList cellHeight="auto" cols={1} spacing={8} style={{ width: "100%", marginBottom: "1rem" }}>
        {items}
      </GridList>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/details">Details</Link>
    </Layout>
  )
}

export default IndexPage

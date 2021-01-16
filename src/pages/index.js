import React from "react"
import { useFlexSearch } from "react-use-flexsearch"
import { graphql } from "gatsby"
import { GridList, GridListTile } from "@material-ui/core"
import { useQueryParam, StringParam } from "use-query-params"
import SearchBar from "material-ui-search-bar"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Item from "../components/item"

export const pageQuery = graphql`
  query ReposQuery {
    localSearchRepos {
      index
      store
    }
  }
`

const IndexPage = ({ data }) => {
  const [query, setQuery] = useQueryParam("search", StringParam)
  const results = useFlexSearch(
    query,
    data.localSearchRepos.index,
    data.localSearchRepos.store,
    { suggest: true }
  )

  const items =
    query && query.length > 1 ? results : data.localSearchRepos.store

  return (
    <Layout>
      <SEO title="Cloudflare Workers catalog" />

      <GridList
        cellHeight="auto"
        cols={1}
        spacing={8}
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        <SearchBar
          value={query || undefined}
          onChange={newValue => setQuery(newValue)}
        />
        {Object.keys(items).map(key => {
          const item = items[key]
          return (
            <GridListTile key={item.id} cols={1}>
              <Item
                name={item.name}
                description={item.description}
                owner={item.owner}
                stars={item.stars}
                forks={item.forks}
                topics={item.topics}
              />
            </GridListTile>
          )
        })}
      </GridList>
    </Layout>
  )
}

export default IndexPage

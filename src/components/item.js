import React from "react"

import { Box, Link, Paper, Typography, Chip } from "@material-ui/core"

import StarIcon from "@material-ui/icons/Star"

const Item = ({ owner, name, description, forks, stars, topics }) => {
  return (
    <Link
      href={`https://github.com/${owner}/${name}`}
      target="_blank"
      rel="noopener noreferrer"
      underline="none"
    >
      <Paper variant="outlined">
        <Box padding={2} display="flex" flexDirection="row">
          <Box
            mx={2}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box>
              <Typography>
                {owner}/{name}
              </Typography>
              <Typography color="textSecondary" variant="subtitle2">
                {description}
              </Typography>
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Typography variant="subtitle2" align="right">
                {stars}
                <StarIcon fontSize="inherit" />
              </Typography>
              <Typography align="right">
                {topics &&
                  topics.map(topic => {
                    return <Chip size="small" label={topic} color="primary" />
                  })}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Link>
  )
}

export default Item

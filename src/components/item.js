import React from "react"

import {
    Box,
    Link,
    Paper,
    Typography,
    Chip,
    IconButton,
} from '@material-ui/core'

import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const Item = ({ owner, name, description, forks }) => {
    return (
        <Link href="/details" underline="none">
            <Paper variant="outlined">
                <Box padding={2} display="flex" flexDirection="row">
                    <Box mx={2} display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%">
                        <Box>
                            <Typography>{name}</Typography>
                            <Typography color="textSecondary" variant="subtitle2">{description}</Typography>
                        </Box>
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Chip label="monitoring" color="primary" />
                            <IconButton color="default" size="small" component="span" style={{ marginLeft: "1rem" }}>
                                <ChevronRightIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Link >
    )
}

export default Item

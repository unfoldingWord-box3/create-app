//import { useEffect } from 'react'
import PropTypes from 'prop-types'
import {Button, Paper, Typography} from '@material-ui/core'

export default function RepoHealthCheck({
  title,
  owner,
  branch,
  server,
  languageId,
  resourceId,
}) 
{

  return (
    <Paper>
      <Typography align="center" variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="body2">Org is {owner}</Typography>
      <Typography variant="body2">LangId is {languageId}</Typography>
      <Typography variant="body2">server is {server}</Typography>
      <Typography variant="body2">branch is {branch}</Typography>
      <Button >{resourceId}</Button>
    </Paper>
  )
}

RepoHealthCheck.propTypes = {
  title: PropTypes.string.isRequired,
  server: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  languageId: PropTypes.string.isRequired,
  resourceId: PropTypes.string.isRequired,
}


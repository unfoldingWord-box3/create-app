import PropTypes from 'prop-types'
import {useState, useEffect, useContext} from 'react'
import {Paper, Typography, CircularProgress} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import CreateRepoButton from './CreateRepoButton'
import RenameRepoButton from './RenameRepoButton'
import { AuthContext } from '@context/AuthContext'

import * as dcsApis from '../utils/dcsApis'

const useStyles = makeStyles(theme => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(4),
  },
}))


export default function RepoHealthCheck({
  title,
  owner,
  languageId,
  resourceId,
}) 
{
  const {authentication} = useContext(AuthContext)
  const [refresh, setRefresh] = useState(true);
  const [repoExists, setRepoExists] = useState(null);
  const [message, setMessage] = useState('Waiting...');
  const classes = useStyles();

  useEffect(() => {
    if ( !refresh ) return;
    if ( owner.toLowerCase() === 'unfoldingword') {
      if ( resourceId === 'glt' ) resourceId = 'ult';
      if ( resourceId === 'gst' ) resourceId = 'ust';
    }
    if ( authentication && authentication.token ) {
      // continue
    } else return;

    const tokenid = authentication.token.sha1;

    const rid = languageId + '_' + resourceId.toLowerCase();
    
    async function doRepoCheck() {
      const repoExists = await dcsApis.repoExists(owner,rid,tokenid);
      setRepoExists(repoExists);
      let _message;
      if ( repoExists ) {
        const {status, valid, format} = await dcsApis.manifestExists(owner, rid, tokenid);
        _message = "Repo OK";
        
        if ( status ) {
          _message += " and manifest exists."
          if ( valid ) {
            _message += " The manifest is valid (parses) with format: "+format;
          }
        }
        else _message += " but manifest does not exist."
      } else {
        _message = "Repo does not exist."
      }

      setMessage(_message);
    }

    doRepoCheck()
    setRefresh(false);

  }, [setRepoExists, setMessage, owner, languageId, resourceId, authentication, refresh])


  return (
    <Paper className={classes.paper} >
      <Typography align="center" variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="body2">Organization: {owner}</Typography>
      <Typography variant="body2">Language ID: {languageId}</Typography>
      <Typography variant="body2">Resource ID: {resourceId}</Typography>
      <Typography variant="body2">
        { message }
      </Typography>
      {
        repoExists === false && 
        <div>
          <CreateRepoButton active={true} owner={owner} languageId={languageId} resourceId={resourceId} refresh={setRefresh} />
          <RenameRepoButton active={true} owner={owner} languageId={languageId} resourceId={resourceId} />
        </div>
      }
    </Paper>
  )
}

RepoHealthCheck.propTypes = {
  title: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  languageId: PropTypes.string.isRequired,
  resourceId: PropTypes.string.isRequired,
}

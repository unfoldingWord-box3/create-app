import PropTypes from 'prop-types'
import {useState, useEffect} from 'react'
import {Paper, Typography, Button} from '@material-ui/core'

import ReactJson from 'react-json-view'
import CreateRepoButton from './CreateRepoButton'
import * as dcsApis from '../utils/dcsApis'
import RenameRepoButton from './RenameRepoButton'

export default function RepoHealthCheck({
  title,
  owner,
  branch,
  server,
  languageId,
  resourceId,
}) 
{
  const [repoCheck, setRepoCheck] = useState(null);

  useEffect(() => {
    if ( owner.toLowerCase() === 'unfoldingword') {
      if ( resourceId === 'glt' ) resourceId = 'ult';
      if ( resourceId === 'gst' ) resourceId = 'ust';
    }
  
    const rid = languageId + '_' + resourceId.toLowerCase();
    let errors = [];
    
    async function doRepoCheck() {
      dcsApis.verifyRepo(owner,rid,errors,resourceId,languageId)
      .then((errors) => {
          setRepoCheck(errors);
      });
    }

    doRepoCheck()

  }, [setRepoCheck, owner, languageId, resourceId])

  function generateMessage() {
    let msg = '';
    if ( !repoCheck ) return msg;

    if ( repoCheck[0].repoFound ) {
      msg = 'Repo OK';
      if ( repoCheck[0].manifestFound ) {
        if ( repoCheck[0].manifestValid ) msg += " and manifest OK.";
        else msg += " but manifest is not valid.";
      } else {
        msg += " but manifest not found."
      }
    }
    else msg = 'Repo not found';
    return msg;
  }


  return (
    <Paper>
      <Typography align="center" variant="h6" gutterBottom>{title}</Typography>
      <Typography variant="body2">Org is {owner}</Typography>
      <Typography variant="body2">LangId is {languageId}</Typography>
      <Typography variant="body2">resourceId is {resourceId}</Typography>
      <Typography variant="body2">
        { generateMessage() }
      </Typography>
      {
        repoCheck && !repoCheck[0].repoFound && 
        <div>
          <CreateRepoButton active={true} owner={owner} languageId={languageId} resourceId={resourceId} />
          <RenameRepoButton active={true} owner={owner} languageId={languageId} resourceId={resourceId} />
        </div>
      }
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

/*
      <ReactJson src={repoCheck} />

        {
          (repoCheck && repoCheck[0].repoFound && 'Repo OK') 
          || 
          (repoCheck && !repoCheck[0].repoFound && 'Repo does not exist')
        }


              <Typography variant="body2">server is {server}</Typography>
      <Typography variant="body2">branch is {branch}</Typography>

*/
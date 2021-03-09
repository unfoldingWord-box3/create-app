import {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useRouter } from 'next/router'

import MuiAlert from '@material-ui/lab/Alert'

function Alert({ severity, message, onDismiss }) {
  const router = useRouter()

  return (
    <MuiAlert
      className='w-full mt-8 mb-4'
      elevation={6}
      variant='filled'
      severity={severity}
      action={
        severity === 'success' && (
          <Button color='inherit' size='small' 
            onClick={() => onDismiss() }>
            OK
          </Button>
        )
      }
    >
      {message}
    </MuiAlert>
  )
}

const useStyles = makeStyles(theme => ({
  textField: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(4),
  },
  formControl: {
    display: 'flex',
    flexDirection: 'column',
    margin: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

function RenameRepoButton({ active, owner, languageId, resourceId }) {
    const [repoRename, setRepoRename] = useState('');
    const [submitRename, setSubmitRename] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
  
    const classes = useStyles({ active })

    function onRepoNameChange(e) {
        setRepoRename(e.target.value)
    }

    async function onSubmitRename() {
        setSubmitRename(true)

        const rid = languageId + '_' + resourceId.toLowerCase();

        let url = 'https://qa.door43.org/api/v1/repos/';
        url += owner + '/';
        url += repoRename;
        url += '?token=3243c0e9575408bf634f87ce64a6e4d892fc4245';

    
        const res = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: `{ "name": "${rid}" }`
          })
      
          if (res.status === 200) {
            setShowSuccess(true)
          } else {
              console.log('response:', res)
              setErrorMessage('Error: '+res.status+' ('+res.statusText+')')
              setShowError(true)
          }
  
        setSubmitRename(false)
    }
    
    function dismissAlert() {
      setShowError(false);
      setShowSuccess(false);
    }

    return (
        <div>
            <TextField
                id={resourceId}
                type='text'
                label='Repo to rename'
                defaultValue={repoRename}
                variant='outlined'
                onChange={onRepoNameChange}
                classes={{ root: classes.textField }}
            />
            <div className='flex flex-col mx-8 mb-4'>
                <Button
                className='self-end'
                variant='contained'
                color='primary'
                size='large'
                disableElevation
                disabled={
                    submitRename || !repoRename
                }
                onClick={onSubmitRename}
                >
                {submitRename ? 'Submitting' : 'Submit'}
                </Button>
                {showSuccess || showError ? (
                <Alert
                  onDismiss={() => dismissAlert()}
                  severity={showSuccess ? 'success' : 'error'}
                  message={
                  showSuccess
                      ? `Repo renamed!`
                      : errorMessage
                  }
                />
                ) : null}
            </div>
        </div>
    )
}

export default RenameRepoButton

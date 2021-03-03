import {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import MuiAlert from '@material-ui/lab/Alert'

function Alert({ severity, message }) {

  return (
    <MuiAlert
      className='w-full mt-8 mb-4'
      elevation={6}
      variant='filled'
      severity={severity}
      action={
        severity === 'success' && (
          <Button color='inherit' size='small' onClick={() => router.push('/')}>
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

function RenameRepoButton({ active, ...rest }) {
    const [repoRename, setRepoRename] = useState('');
    const [submitRename, setSubmitRename] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
  
    const classes = useStyles({ active })

    function onRepoNameChange(e) {
        setRepoRename(e.target.value)
    }

    async function onSubmitRename() {
        setSubmitRename(true)
    
        const res = await fetch('/api/xxxfeedback', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
    
        if (res.status === 200) {
          console.log('res.status', res.status)
          setShowSuccess(true)
        } else {
          setShowError(true)
        }
    
        setSubmitRename(false)
    }
    
    
    return (
        <div>
            <TextField
                id='repo-rename-form'
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
                    severity={showSuccess ? 'success' : 'error'}
                    message={
                    showSuccess
                        ? `Repo renamed!`
                        : `Something went wrong`
                    }
                />
                ) : null}
            </div>
        </div>
    )
}

export default RenameRepoButton

import {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import MuiAlert from '@material-ui/lab/Alert'

function Alert({ severity, message, onDismiss }) {

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
  root: {
    color: theme.palette.primary.main,
    backgroundColor: props => (props.active ? '#ffffff' : 'transparent'),
    '&:hover': {
      color: props => (props.active ? '#ffffff' : theme.palette.primary.main),
      backgroundColor: props => (props.active ? '#07b811' : '#ffffff'),
    },
    border: '1px solid #0089C7',
  },
}))


function CreateRepoButton({active, owner, languageId, resourceId }) {
    const [submitCreate, setSubmitCreate] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
   
    useEffect(() => {
        if ( !submitCreate ) return;

        if ( owner.toLowerCase() === 'unfoldingword') {
          if ( resourceId === 'glt' ) resourceId = 'ult';
          if ( resourceId === 'gst' ) resourceId = 'ust';
        }
      
        const rid = languageId + '_' + resourceId.toLowerCase();
        
        async function doSubmitCreate() {
        
            const res = await fetch('https://qa.door43.org/api/v1/orgs/translate_test/repos?token=3243c0e9575408bf634f87ce64a6e4d892fc4245', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: `{
                "auto_init": true,
                "default_branch": "master",
                "description": "Init New Repo by Admin App",
                "gitignores": "macOS",
                "issue_labels": "",
                "license": "CC-BY-SA-4.0.md",
                "name": "${rid}",
                "private": false,
                "readme": "",
                "template": true,
                "trust_model": "default"
              }`
            })
        
            if (res.status === 201) {
              setShowSuccess(true)
            } else {
                console.log('response:', res)
                setErrorMessage('Error: '+res.status+' ('+res.statusText+')')
                setShowError(true)
            }
        
        }
        
        doSubmitCreate();
        setSubmitCreate(false);
      }, [submitCreate, owner, languageId, resourceId])
    
    function dismissAlert() {
      setShowError(false);
      setShowSuccess(false);
    }
    
    const classes = useStyles({ active })
    return (
      <div>
        <Button className={classes.root} onClick={() => setSubmitCreate(true)} >
            Create Repo
        </Button>
        {showSuccess || showError ? (
            <Alert
              onDismiss={() => dismissAlert()}
              severity={showSuccess ? 'success' : 'error'}
              message={
              showSuccess
                  ? `Repo Created!`
                  : errorMessage
              }
            />
        ) : null}
      </div>
  )
}

export default CreateRepoButton

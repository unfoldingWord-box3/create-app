import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
    backgroundColor: props => (props.active ? '#1BCC25' : 'transparent'),
    '&:hover': {
      color: props => (props.active ? '#ffffff' : theme.palette.primary.main),
      backgroundColor: props => (props.active ? '#07b811' : '#ffffff'),
    },
    border: '1px solid #0089C7',
  },
}))

function CreateRepoButton({ active, ...rest }) {
  const classes = useStyles({ active })
  return (
    <Button className={classes.root} {...rest}>
      Create Repo
    </Button>
  )
}

export default CreateRepoButton

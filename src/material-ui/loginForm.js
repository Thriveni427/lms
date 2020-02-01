const loginForm = theme => ({
  main: {
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 680,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  paper: {
    boxShadow: `0 1px 4px 0 rgba(0,0,0,.25);`,
    width: '100%',
    backgroundColor: 'white'
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
export default loginForm;
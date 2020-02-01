// import { FormHelperText } from "@material-ui/core";

const buttons = theme => ({
  button: {
    marginRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit + 10,
    paddingRight: theme.spacing.unit + 10,
    paddingTop: theme.spacing.unit,
    paddingBttom: theme.spacing.unit,
  },
  buttonPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#fff'
    },
  },
  buttonSecondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  },
  buttonPrimaryMenu: {
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: '#fff',
      color: '#000'
    },
  },
  buttonSecondaryMenu: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
    },
  },
  buttonRed: {
    backgroundColor: 'red',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'red',
      color: '#fff',
    },
  },
  buttonWhite: {
    backgroundColor: '#fff',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#fff',
    },
  },
  buttonLarge: {

  },
  buttonMedium: {

  },
  buttonSm: {
    padding: theme.spacing.unit-3
  },
  buttonTableAction:{
    padding: 0,
    marginLeft: 10,
    //width: 100
  },
  buttonTableActionBtnCurses:{
        float: 'right',
        padding: 0,
    marginLeft: 10,
  },
  rowBtnAlignCourses:{
     
  }
})

export default buttons;

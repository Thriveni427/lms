export const CourseStyles = theme => ({
  CourseMaterialMenu: {
    width: 200
  },
  Coursenested: {
    padding: 5,
  },
  CoursemenuItem: {
    backgroundColor: theme.palette.primary.main,
    padding: 5,
    '& $primary, & $navicon, & span': {
      color: '#fff'
    },
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    }
  },
  newSubject: {
    backgroundColor: '#3c8dbc',
    padding: 5,
    '& $primary, & $navicon, & span': {
      color: '#fff'
    },
    '&:hover, &:focus': {
      backgroundColor: '#3c8dbc',
    }
  },
  newChapter: {
    backgroundColor: '#3c8dbc',
    padding: 5,
    '& $primary, & $navicon, & span': {
      color: '#fff'
    },
    '&:hover, &:focus': {
      backgroundColor: '#3c8dbc',
    }
  },
  newTopic: {
    backgroundColor: '#3c8dbc',
    padding: 5,
    '& $primary, & $navicon, & span': {
      color: '#fff'
    },
    '&:hover, &:focus': {
      backgroundColor: '#3c8dbc',
    }
  }
})
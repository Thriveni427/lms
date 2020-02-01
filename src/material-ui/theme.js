// MATERIAL UI
import { createMuiTheme } from "@material-ui/core/styles";
export default createMuiTheme({
  palette: {
    primary: {
      light: "#18a595",
      main: "#027c6e",
      dark: "#18202C",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#ff9c00",
      dark: "#ba000d",
      contrastText: "#000"
    },
    typography: {
      fontFamily: ["Roboto"]
    }
  },
  overrides: {
    MuiMenuItem: {
      root: {
        "&$selected": {
          backgroundColor: "#0d141f",
          color: "white",
          "&:hover, &:focus": {
            backgroundColor: "#0d141f",
            color: "white"
          },
          "& $primary, & svg, & span": {
            color: "white"
          }
        }
      }
    },
    MuiPaper: {
      root: {
        backgroundColor: "#FFF"
      },
      elevation1: {
        boxShadow: `0 0 2rem 0 rgba(136, 152, 170, 0.15)`
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        minHeight: 50
      },
      expanded: {
        minHeight: `0px!important`
      }
    },
    MuiExpansionPanel: {
      expanded: {
        margin: 0
      }
    }
  }
});

// export default createMuiTheme({
//   palette:{
//     primary: {
//       light: palette.primary.main[300],
//       // light: will be calculated from palette.primary.main,
//       main: '#027c6e',
//       // dark: will be calculated from palette.primary.main,
//       // contrastText: will be calculated to contrast with palette.primary.main
//       contrastText: '#FFFFFF',
//     },
//     white: '#FFFFFF',
//     secondary: {
//       light: '#0066ff',
//       main: '#ff9c00',
//       // dark: will be calculated from palette.secondary.main,
//       contrastText: '#FFFFFF',
//     },
//     // error: will use the default color
//   },
//   typography: {
//     fontFamily: ['Roboto'],
//   },
//   overrides: {
//     MuiMenuItem: {
//       root: {
//         '&$selected': {
//           backgroundColor: '#027c6e',
//           color: 'white',
//           '&:hover, &:focus': {
//             backgroundColor: '#027c6e',
//             color: 'white',
//           },
//           '& $primary, & svg, & span': {
//             color: 'white'
//           },
//         },
//       },
//     }
//   },
// });

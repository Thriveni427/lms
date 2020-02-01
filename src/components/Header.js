import React, { Fragment } from "react";
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Input from "@material-ui/icons/Input";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
  },
  toolbar: {
    paddingLeft: 80
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    avatar: {
      backgroundColor: "#673ab7",
      marginLeft: -8,
      marginTop: -6
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class Header extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  handleLogout = () => {
    sessionStorage.clear();
    this.props.history.push({
      pathname: '/login'
    })
    //window.location.reload();
  }
  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Fragment>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
        PaperProps={{
            style: {
              width: 200,
              marginTop: 30
            },
          }}
      >
         {/* <div className="clickMenu">
            <CardHeader
              className="adminAvatar"
              avatar={
                <div>
                    <Avatar
                      aria-label="Recipe"
                      className={classes.avatar}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfcGUeNTGiyaG3UhTOeN4infQIXDUZOK0Pdp6lmELXMjKpg5U3"
                    />
                </div>
              }
              title={<h5>Admin</h5>}
              subheader={<h6>admin</h6>}
            /> */}
        {/* <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={this.handleLogout}>Logout</MenuItem> */}

              <MenuItem className="iconBtnLeft" onClick={this.handleMenuClose}>
                <div className="inputIconfa">
                  <i className="fa fa-user profilePhoto" aria-hidden="true" />
                </div>
                <div className="linkProfiles2">Profile</div>
              </MenuItem>
              
              <MenuItem className="iconBtnLeft" onClick={this.handleMenuClose}>
              <div className="inputIconfa ">
              <i className="fa fa-address-card profilePhoto1" aria-hidden="true" />
              </div>
              <div className="linkProfiles mb-1">My account</div>
              </MenuItem>

              <MenuItem className="iconBtnLeft" onClick={this.handleLogout}>
              <div className="inputIconfa ">
                <Input className="inputIcon" />
              </div>
              <div className="linkProfiles">Logout</div>
             </MenuItem>
             {/* </div> */}
      </Menu>
      </Fragment>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
        PaperProps={{
          style: {
            width: 300,
            marginTop: 30
          },
        }}
      >
        <MenuItem className="iconBtnLeft" onClick={this.handleMobileMenuClose}>
        <div className="inputIconfa ">
                <MailIcon className="inputIcon" />
              </div>
          <div className="linkProfiles2">Messages</div>
        </MenuItem>
        <MenuItem className="iconBtnLeft" onClick={this.handleMobileMenuClose}>
        <div className="inputIconfa ">
                <NotificationsIcon className="inputIcon" />
              </div>
          <div className="linkProfiles2">Notifications</div>
        </MenuItem>
        <MenuItem className="iconBtnLeft mr-2" onClick={this.handleProfileMenuOpen}>
        <div className="inputIconfa mr-2">
        <i className="fa fa-user profilePhoto " aria-hidden="true" />
              </div>
          <div className="linkProfiles2">Profile</div>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                {/* <Badge badgeContent={4} color="secondary"> */}
                  <MailIcon />
                {/* </Badge> */}
              </IconButton>
              <IconButton color="inherit">
                {/* <Badge badgeContent={17} color="secondary"> */}
                  <NotificationsIcon />
                {/* </Badge> */}
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state
}
const mapDispatchToProps = () => {
  //return bindActionCreators({loginAction}, dispatch)
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default compose(
   withStyles(styles),
   connect(mapStateToProps, mapDispatchToProps)
)(withRouter(Header))
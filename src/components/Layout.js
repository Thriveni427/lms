import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import BurgerMenu from 'react-burger-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import combinedStyles from '../material-ui';
import Logo from './images/lms-logo-2.png';
import MenuWrap from './Drawer';
import Header from './Header';
import Footer from './Footer';
import { VendorMenu, UsersMenu, CourseMenu, TestPaperMenu, TrainerUserMenu } from '../helpers/menus';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMenu: 'push',
      side: 'left',
      openVendor: false,
      openUser: false,
      openCourse: false,
      openTest: false,
      openLive: false,
      openReport: false,
    };
  }

  render() {
    let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
    if (userinfo === null) userinfo = [];
    console.log(userinfo)
    console.log(this.props);
    
    const Menu = BurgerMenu[this.state.currentMenu];
    //const items = this.getItems();
    const { classes, location: { pathname } } = this.props;
    return (
      <div id="o-wrapper" className="o-wrapper">
        <MenuWrap wait={20}>
          <Menu
            id={this.state.currentMenu}
            pageWrapId={'page-wrap'}
            outerContainerId={'o-wrapper'}
          >
            <div className="c-logo">
              <img src={Logo} alt="logo" className="c-logo__media" />
            </div>
            <Divider className={classes.lightdivider} />
            <Paper className={classes.navpaper}>
              <MenuList className={classes.MenuList}>
                <MenuItem className={classes.menuItem} component={Link} to="/dashboard" selected={'/dashboard' === pathname}>
                  <ListItemIcon className={classes.navicon}>
                    <FontAwesomeIcon icon="sliders-h" />
                  </ListItemIcon>
                  <ListItemText classes={{ primary: classes.primary }} inset primary="Dashboard" />
                </MenuItem>

               

              </MenuList>
            </Paper>
          </Menu>
        </MenuWrap>
        <div id="page-wrap">
          <Header />
          <main className="c-main">
            {this.props.children}
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}
export default compose(
  withRouter,
  withStyles(combinedStyles)
)(Layout)
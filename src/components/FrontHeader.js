/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { withFormik } from "formik";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";


import combinedStyles from "../material-ui/combineStyles";
import { actionGetNestedCategory } from "../actions/Home/actionGetNestedCategory";
import { actionGetCoursesByCategory } from "../actions/Home/actionGetCoursesByCategory";


class FrontHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showSuccess: false,
      showLoginModal: false
    };
  }

  handleClickCategoryByCourse = (e, id) => {
    this.props.actionGetCoursesByCategory(id);
    this.props.history.push({
      pathname: "/coursebycategory"
    });
    // console.log(item);
  };

  componentDidMount = () => {
    this.props.actionGetNestedCategory();
  };

  handleLoginClick = (e, id) => {
    e.preventDefault();
    this.props.handleLoginClick();
  }
  handleSignUpClick = (e, id) => {
    e.preventDefault();
    this.props.handleSignUpClick();
  }

  // handleLoginClose = () => {
  //   this.setState({ showLoginModal: false });
  // };

  handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.reload();
  }

  render() {
    let isLoggedIn = sessionStorage.getItem("userinfo");
    console.log(isLoggedIn, JSON.parse(sessionStorage.getItem("userinfo")));

    console.log(this.props);
    let { getNestedCategoryReducer } = this.props;
    return (
      <header className="header menu_2">
        <div id="logo">
          <a href="/home">beetleLMS</a>
        </div>
        <ul id="top_menu">

          {
            (isLoggedIn === false || isLoggedIn === undefined || isLoggedIn === null)
              ?
              (
                <React.Fragment>
                  <li className="hidden_tablet" onClick={(e) => { this.handleLoginClick(e, 1) }}>
                    <a href="#" className="btn_1 rounded">
                      Login
                  </a>
                  </li>
                  <li className="hidden_tablet" onClick={(e) => { this.handleSignUpClick(e, 1) }}>
                    <a href="#" className="btn_1 rounded">
                      Sign up
                  </a>
                  </li>
                </React.Fragment>
              )

              :
              (
                <li className="hidden_tablet" onClick={(e) => { this.handleLogout(e) }}>
                  <a href="#" className="btn_1 rounded">
                    Logout
                  </a>
                </li>
              )


          }

          {/* <li>
            <a href="#0" className="search-overlay-menu-btn">
              Search
            </a>
          </li> */}
          {/* <li className="hidden_tablet">
            <a href="/login" className="btn_1 rounded">
              Get Started
            </a>
          </li> */}
        </ul>

        <a href="#menu" className="btn_mobile">
          <div className="hamburger hamburger--spin" id="hamburger">
            <div className="hamburger-box">
              <div className="hamburger-inner" />
            </div>
          </div>
        </a>
        <nav id="menu" className="main-menu">
          <ul>
            <li>
              <span>
                <a href="/home">Home</a>
              </span>
            </li>
            <li>
              <span>
                <a href="/coursebycategory">Training Library</a>
              </span>
              <ul className="courceUILI widthUi">
                {getNestedCategoryReducer.gotNestedCategory === true &&
                  getNestedCategoryReducer.gotNestedCategoryData.map(
                    (item, i) => {
                      return (
                        <li className="courceUILI widthLi" key={i}>
                          <a
                            style={{ fontSize: "15px", color: "#00000" }}
                            href="#"
                            onClick={e =>
                              this.handleClickCategoryByCourse(
                                e,
                                item.CategoryID
                              )
                            }
                          >
                            {item.CategoryName}
                            {/* <p style={{ fontSize: "15px", color: '#00000' }}>{item.CategoryName}</p> */}
                          </a>
                        </li>
                      );
                    }
                  )}
              </ul>
            </li>
            <li>
              <span>
                <a href="/price">Price</a>
              </span>
            </li>
            <li>
              <span>
                <a href="/partners">Partners</a>
              </span>
            </li>
          </ul>
        </nav>

        <div className="search-overlay-menu">
          <span className="search-overlay-close">
            <span className="closebt">
              <i className="ti-close" />
            </span>
          </span>
          <form role="search" id="searchform" method="get">
            <input value="" name="q" type="search" placeholder="Search..." />
            <button type="submit">
              <i className="icon_search" />
            </button>
          </form>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionGetNestedCategory,
      actionGetCoursesByCategory
    },
    dispatch
  );
};
const formikEnhancer = withFormik({
  mapPropsToValues: () => ({}),

  displayName: "FrontHeader"
})(FrontHeader);

const CoursesForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default withRouter(withStyles(combinedStyles)(CoursesForm));

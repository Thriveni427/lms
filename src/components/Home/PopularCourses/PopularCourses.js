/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import "../../../css/style.css";
// import "../../../css/vendors.css";
// import "../../../css/icon_fonts/css/all_icons.min.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { actionGetPopularCourses } from "../../../actions/Home/actionGetPopularCourses";
// import Button from "@material-ui/core/Button";

class PopularCourses extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    this.props.actionGetPopularCourses();
  }

  handleClick = item => {
    this.props.history.push({
      pathname: "/coursedetails",
      state: { detail: item }
    });
    console.log(item);
  };

  render() {
    const { getPopularCoursesReducer } = this.props;
    console.log(this.props);
    return (
      <div className="container-fluid margin_120_0">
        <div className="main_title_2">
          <span>
            <em />
          </span>
          <h2>Popular Courses</h2>
          <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
        </div>

        <OwlCarousel
          id="reccomended"
          center
          className="owl-carousel owl-theme"
          loop={true}
          margin={10}
          items={4}
          autoplay
          dots={false}
        >
          {
            (getPopularCoursesReducer.popularCoursesData === undefined || getPopularCoursesReducer.popularCoursesData === null || getPopularCoursesReducer.popularCoursesData.length < 1)
            ?
            getPopularCoursesReducer.popularCoursesData.map((item, i) => {
              console.log(item);
              let desc = item.CourseSummary;
              if (desc.length > 25) {
                desc = desc.substring(0, 25);
              } else {
                desc = item.CourseSummary;
              }

              return (
                <div className="item" key={i}>
                  <div className="box_grid">
                    <figure>
                      <a href="#0" className="wish_bt" />
                      <div
                        className="card d-flex justify-content-center"
                        style={{
                          height: 150,
                          width: "100%",
                          overflow: "hidden"
                        }}
                      >
                        <a onClick={() => this.handleClick(item)}>
                          <img
                            src={
                              item.iuploadname == null
                                ? " "
                                : item.iuploadname.slice(0, -1)
                            }
                            className="img-fluid"
                            alt=""
                          />
                        </a>
                      </div>

                      <div className="price">$45</div>
                      <div className="preview">
                        <span onClick={() => this.handleClick(item)}>
                          Preview course
                      </span>
                      </div>
                    </figure>
                    <div className="wrapper">
                      <small>{item.CategoryName}</small>
                      <h3>{item.CourseName}</h3>
                      <p>{desc}</p>
                      <div className="rating">
                        <i className="icon_star voted" />
                        <i className="icon_star voted" />
                        <i className="icon_star voted" />
                        <i className="icon_star" />
                        <i className="icon_star" /> <small>(145)</small>
                      </div>
                    </div>
                    <ul>
                      <li>
                        <i className="icon_clock_alt" /> 1h 30min
                    </li>
                      <li>
                        <i className="icon_like" /> 890
                    </li>
                      <li>
                        <a onClick={() => this.handleClick(item)}>
                          Preview course
                      </a>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            }
            
            ):null
          }
        </OwlCarousel>

        {/* <div className="container">
				<p className="btn_home_align"><a href="courses-grid.html" className="btn_1 rounded">View all courses</a></p>
			</div> */}
        <hr />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      actionGetPopularCourses
    }
  )(PopularCourses)
);

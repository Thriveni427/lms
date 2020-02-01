import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "../../css/style.css";
import "../../css/vendors.css";
import "../../css/icon_fonts/css/all_icons.min.css";
// import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import FrontHeader from "../FrontHeader";
import FrontFooter from "../FrontFooter";
import PopularCourses from "./PopularCourses/PopularCourses";
import UserLogin from "../UserLogin";
import RegisterForm from "../RegisterForm";
import { actionGetLearningPath } from "../../actions/Home/actionGetLearningPath";
import { actionGetActiveCourseStatus } from "../../actions/Dashboard/actionGetActiveCourseStatus";
import { actionGetOverallCourses } from "../../actions/Home/actionGetOverallCourses";
import { actoinGetCourseCompletedStatus } from "../../actions/Dashboard/actoinGetCourseCompletedStatus";
// import { actionGetPopularCourses } from "../../actions/Home/actionGetPopularCourses";

class Home extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      showLoginModal: false,
      showRegisterModal: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  componentDidMount() {
    // this.props.actionGetPopularCourses();
    this.props.actionGetActiveCourseStatus();
    this.props.actionGetOverallCourses();
    this.props.actoinGetCourseCompletedStatus();
    this.props.actionGetLearningPath();
  }

  handleLoginClick = (id = 1) => {
    this.setState({
      showLoginModal: true,
      courseID: id
    });
  };

  handleSignUpClick = (id = 1) => {
    this.setState({
      showRegisterModal: true,
      courseID: id
    });
  };

  handleSignUpClose = () => {
    this.setState({ showRegisterModal: false });
  };

  handleLoginClose = () => {
    this.setState({ showLoginModal: false });
  };

  render() {

    const {
      getActiveCourseStatusReducer,
      getOverallCoursesReducer,
      getCourseCompletedStatusReducer,
      getLearningPathReducer
    } = this.props;
    console.log(this.props);

    return (
      <div className="homeContainer">
        <FrontHeader
          handleLoginClick={this.handleLoginClick}
          handleSignUpClick={this.handleSignUpClick}
          courseID={this.state.courseID}
        />
        <main>
          <section className="hero_single version_2">
            <div className="wrapper">
              <div className="container">
                <h3>What would you learn?</h3>
                <p>
                  Increase your expertise in business, technology and personal
                  development
                </p>
                <form>
                  <div id="custom-search-input">
                    <div className="input-group">
                      <input
                        type="text"
                        className=" search-query"
                        placeholder="Ex. Architecture, Specialization..."
                      />
                      <input
                        type="submit"
                        className="btn_search"
                        value="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
          <div className="features clearfix">
            <div className="container">
              <ul>
                <li>
                  <i className="pe-7s-study" />
                  <h4>
                    {getActiveCourseStatusReducer.ActiveCourseStatusData[0] ===
                      null ||
                      getActiveCourseStatusReducer.ActiveCourseStatusData[0] ===
                      undefined ||
                      getActiveCourseStatusReducer.ActiveCourseStatusData[0]
                        .length < 1
                      ? null
                      : getActiveCourseStatusReducer.ActiveCourseStatusData[0]
                        .TotalActiveCourses}{" "}
                    Over All Courses
                  </h4>
                  <span>Over All Courses</span>
                </li>
                <li>
                  <i className="pe-7s-cup" />
                  <h4>
                    {getCourseCompletedStatusReducer
                      .CourseCompletedStatusData[0] === null ||
                      getCourseCompletedStatusReducer
                        .CourseCompletedStatusData[0] === undefined ||
                      getCourseCompletedStatusReducer.CourseCompletedStatusData[0]
                        .length < 1
                      ? null
                      : getCourseCompletedStatusReducer
                        .CourseCompletedStatusData[0]
                        .TotalCoursesCompleted}{" "}
                    Completed Courses
                  </h4>
                  <span>Completed Courses</span>
                </li>
                <li>
                  <i className="pe-7s-target" />
                  <h4>
                    {getOverallCoursesReducer.OverallCoursesData[0] === null ||
                      getOverallCoursesReducer.OverallCoursesData[0] ===
                      undefined ||
                      getOverallCoursesReducer.OverallCoursesData[0].length < 1
                      ? null
                      : getOverallCoursesReducer.OverallCoursesData[0]
                        .TotalCoursesEnrolled}{" "}
                    Enrolled Learners
                  </h4>
                  <span>Enrolled Learners </span>
                </li>
              </ul>
            </div>
          </div>
          <PopularCourses />
          <div className="container margin_30_95">
            <div className="main_title_2">
              <span>
                <em />
              </span>
              <h2>Popular Learning Path</h2>
              <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
            </div>
            <div className="row">
              {getLearningPathReducer.LearningPathData.map(learn => {
                console.log(learn);

                return (
                  <div className="col-lg-4 col-md-6 wow" data-wow-offset="150">
                    <a href="#0" className="grid_item">
                      <figure className="block-reveal">
                        <div className="block-horizzontal" />

                        <div
                          className="card d-flex justify-content-center"
                          style={{
                            height: 150,
                            width: "100%",
                            overflow: "hidden"
                          }}
                        >
                          <img
                            src={learn.ImageLocation}
                            className="img-fluid"
                            alt=""
                          />
                        </div>

                        <div className="info">
                          <small>
                            <i className="ti-layers" />
                            {learn.NoOfCourses} Courses
                          </small>
                          <h3>{learn.PathName}</h3>
                        </div>
                      </figure>
                    </a>
                  </div>
                );
              })}

              {/* <div className="col-lg-4 col-md-6 wow" data-wow-offset="150">
					<a href="#0" className="grid_item">
						<figure className="block-reveal">
							<div className="block-horizzontal"></div>
							<img src="http://via.placeholder.com/800x533/ccc/fff/course_2.jpg" className="img-fluid" alt="" />
							<div className="info">
								<small><i className="ti-layers"></i>23 Programmes</small>
								<h3>Engineering</h3>
							</div>
						</figure>
					</a>
				</div>
				<div className="col-lg-4 col-md-6 wow" data-wow-offset="150">
					<a href="#0" className="grid_item">
						<figure className="block-reveal">
							<div className="block-horizzontal"></div>
							<img src="http://via.placeholder.com/800x533/ccc/fff/course_3.jpg" className="img-fluid" alt="" />
							<div className="info">
								<small><i className="ti-layers"></i>23 Programmes</small>
								<h3>Architecture</h3>
							</div>
						</figure>
					</a>
				</div>
				<div className="col-lg-4 col-md-6 wow" data-wow-offset="150">
					<a href="#0" className="grid_item">
						<figure className="block-reveal">
							<div className="block-horizzontal"></div>
							<img src="http://via.placeholder.com/800x533/ccc/fff/course_4.jpg" className="img-fluid" alt="" />
							<div className="info">
								<small><i className="ti-layers"></i>23 Programmes</small>
								<h3>Science and Biology</h3>
							</div>
						</figure>
					</a>
				</div>
				<div className="col-lg-4 col-md-6 wow" data-wow-offset="150">
					<a href="#0" className="grid_item">
						<figure className="block-reveal">
							<div className="block-horizzontal"></div>
							<img src="http://via.placeholder.com/800x533/ccc/fff/course_5.jpg" className="img-fluid" alt="" />
							<div className="info">
								<small><i className="ti-layers"></i>23 Programmes</small>
								<h3>Law and Criminology</h3>
							</div>
						</figure>
					</a>
				</div>
				<div className="col-lg-4 col-md-6 wow" data-wow-offset="150">
					<a href="#0" className="grid_item">
						<figure className="block-reveal">
							<div className="block-horizzontal"></div>
							<img src="http://via.placeholder.com/800x533/ccc/fff/course_6.jpg" className="img-fluid" alt="" />
							<div className="info">
								<small><i className="ti-layers"></i>23 Programmes</small>
								<h3>Medical</h3>
							</div>
						</figure>
					</a>
				</div> */}
            </div>
          </div>

          <div className="call_section">
            <div className="container clearfix">
              <div
                className="col-lg-5 col-md-6 float-right wow"
                data-wow-offset="250"
              >
                <div className="block-reveal">
                  <div className="block-vertical" />
                  <div className="box_1">
                    <h3>Employee and Team Training Solutions</h3>
                    <p>
                      Ius cu tamquam persequeris, eu veniam apeirian platonem
                      qui, id aliquip voluptatibus pri. Ei mea primis ornatus
                      disputationi. Menandri erroribus cu per, duo solet congue
                      ut.{" "}
                    </p>
                    <a href="#0" className="btn_1 rounded">
                      Read more
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <UserLogin
          showLoginModal={this.state.showLoginModal}
          handleLoginClose={this.handleLoginClose}
          handleSignUpClick={this.handleSignUpClick}
          courseID={this.state.courseID}
          redirectPath={'/home'}
        />
        <RegisterForm
          showRegisterModal={this.state.showRegisterModal}
          handleLoginClick={this.handleLoginClick}
          handleSignUpClose={this.handleSignUpClose}
          courseID={this.state.courseID}
          redirectPath={'/home'}
        />
        <FrontFooter />
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
      actionGetActiveCourseStatus,
      actionGetLearningPath,
      actoinGetCourseCompletedStatus,
      actionGetOverallCourses
    }
  )(Home)
);

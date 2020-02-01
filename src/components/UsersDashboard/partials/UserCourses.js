import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
//  import { Line, Circle } from 'rc-progress';
import axios from "axios";
import { toast } from "react-toastify";


import * as GLOBAL from "../../../utils/index";
import CourseProgress from "./CourseProgress";
import { actionGetAssignedCourses, actionGetAllCourses } from "../../../actions/Courses/User/actionGetUserCourses";


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

export class UserCourses extends Component {
  constructor() {
    super();
    this.state = {
      percent: 0,
      color: "#3FC7FA",
      showAllCourses: true,
      showAssignedCourses: false
    };
  }

  getAssignedCourses = () => {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo === null) userinfo = [];
    if (userinfo.UserID !== undefined) {
      this.props.actionGetAssignedCourses(userinfo.UserID);
    }
  };
  componentDidMount = () => {
    this.getAssignedCourses();
  };

  handleDetails = row => {
    let reqQuery = {
      // enrolledID: row.EnrolledID,
      // joiningStatus: "Enrolled"
      enrolledID: row.EnrolledID,
      joiningStatus: "Enrolled"
    };
    console.log(this.props);
    if (row.JoiningStatus === "Assigned") {
      axios
        .post(`${GLOBAL.API_HOST}/enrollCourse`, reqQuery)
        .then(res => {
          toast.success("Enrolled Successfully");
          // this.props.actionGetAllCourses();
          this.getAssignedCourses();
          this.setState({
            showAllCourses: true,
            showAssignedCourses: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else if (row.JoiningStatus === "Completed") {
      this.props.history.push({
        pathname: "/userscoursecontent",
        state: { courseDetail: row }
      });
    }
    // if (row.JoiningStatus === "Completed") {
    //   console.log("Completed");
    //   this.props.history.push({
    //     pathname: "/userscoursecontent",
    //     state: { courseDetail: row }
    //   });
    // }
    else {
      console.log("all");
      this.props.history.push({
        pathname: "/userscoursedetails",
        state: { courseDetail: row }
      });
    }
  };

  render() {
    const { classes, getUserCoursesReducer } = this.props;
    console.log(this.props);
    return (
      <div className="w-100">
        <div className="col-md-12">
          {getUserCoursesReducer.courseData !== undefined && getUserCoursesReducer.courseData !== null ?
          getUserCoursesReducer.courseData.map((arr, index) => {
            return (
              <div
                className="d-md-flex justify-content-center align-items-center mb-5"
                key={index}
              >
                <div className="mr-4" style={{ flexBasis: 200 }}>
                  <img className="card" src={arr.iuploadname == null ? "" : arr.iuploadname.slice(0, -1)} width="200" alt="card" />
                  {/* <img alt="imag" className="card mb-0" src={require('../../images/514204-amazon-web-services-logo.jpg')} width="200" /> */}
                </div>
                <div className="mr-4" style={{ flexBasis: "40%" }}>
                  <h2>{arr.CourseName}</h2>
                  <p>{arr.CourseSummary} </p>
                </div>
                <div className="mr-4" style={{ flexBasis: 400 }}>
                  {arr.JoiningStatus === "Enrolled" ? (
                    <CourseProgress percentage={arr.CompletionStatus} />
                  ) : arr.JoiningStatus === "Completed" ? (
                    <CourseProgress percentage={arr.CompletionStatus} />
                  ) : (
                        ""
                      )}
                  {/* <CourseProgress percentage={arr.CompletionStatus} /> */}
                </div>
                <div className="mb-0">
                  <Button
                    variant="contained"
                    className={[classes.button, classes.buttonPrimary]}
                    type="submit"
                    color="primary"
                    onClick={() => this.handleDetails(arr)}
                  >
                    {arr.JoiningStatus === "Enrolled"
                      ? "Resume"
                      : arr.JoiningStatus === "Completed"
                        ? "Review"
                        : "Enroll"}
                  </Button>
                </div>
              </div>
            );
          })
        :<h5>You have not joined any course yet</h5>
        }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    { actionGetAssignedCourses, actionGetAllCourses }
  )(UserCourses)
);

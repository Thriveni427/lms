import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import combinedStyles from "../../material-ui";
import Button from "@material-ui/core/Button";
import TabContainer from "./partials/TabContainer";

let AssignedCount = 0,
  enrollCount = 0,
  completedCount = 0;
class UsersDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getAllEnroll() {
    let asCount = 0,
      enount = 0,
      comCount = 0;
    if (this.props.getUserCoursesReducer.courseData.length > 0) {
      for (
        let i = 0;
        i < this.props.getUserCoursesReducer.courseData.length;
        i++
      ) {
        if (
          this.props.getUserCoursesReducer.courseData[i].JoiningStatus ===
          "Assigned"
        ) {
          asCount++;
        }
        if (
          this.props.getUserCoursesReducer.courseData[i].JoiningStatus ===
          "Enrolled"
        ) {
          enount++;
        }
        if (
          this.props.getUserCoursesReducer.courseData[i].JoiningStatus ===
          "Completed"
        ) {
          comCount++;
        }

        if (this.props.getUserCoursesReducer.courseData.length === i + 1) {
          AssignedCount = asCount;
          enrollCount = enount;
          completedCount = comCount;
        }
      }
    }
  }

  render() {
    const { classes } = this.props;
    console.log("this.props", this.props);

    this.getAllEnroll();

    return (
      <React.Fragment>
        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col">
              <div className="c-dashboard col-md-12">
                <div className="row">
                  <div className="col-md-4">
                    <div className="d-flex u-bgIndigo text-white">
                      <div className="userChartContent w-100">
                        <div className="userChartContent__title mb-4">
                          Courses to take up
                        </div>
                        <h2 className="mb-2 u-fs__xl text-white">{AssignedCount}</h2>
                      </div>
                      <div className="p-3">
                        <i
                          className="fas fa-file-alt"
                          style={{ fontSize: 50 }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex u-bgPink text-white">
                      <div className="userChartContent w-100">
                        <div className="userChartContent__title mb-4">
                          Overdue courses
                        </div>
                        <h2 className="mb-2 u-fs__xl text-white">{enrollCount}</h2>
                      </div>
                      <div className="p-3">
                        <i
                          className="fas fa-history"
                          style={{ fontSize: 50 }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="d-flex u-bgCyan text-white">
                      <div className="userChartContent w-100">
                        <div className="userChartContent__title mb-4">
                          Completed courses
                        </div>
                        <h2 className="mb-2 u-fs__xl text-white">{completedCount}</h2>
                      </div>
                      <div className="p-3">
                        <i
                          className="fas fa-check-circle"
                          style={{ fontSize: 50 }}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-3">
                      <div className="d-flex u-bgSuccess text-white">
                        <div className="userChartContent w-100">
                          <div className="userChartContent__title mb-4">ONLINE LEARNERS</div>
                          <h2 className="mb-2 u-fs__xl">87,239</h2>
                          <p className="mb-0"><span> Avg. 327 online daily</span></p>
                        </div>
                        <div className="p-3"><i className="fas fa-atlas" style={{fontSize: 50}}></i></div>
                      </div>
                    </div> */}
                </div>
              </div>
              <div className="c-dashboard col-md-12 mt-5">
                <div className="card col-md-12">
                  <div className="row">
                    <div
                      className="d-flex col-xl-12 pt-4 justify-content-between pb-3"
                      style={{
                        borderBottomWidth: 1,
                        borderBottomColor: "#E4E4E4",
                        borderBottomStyle: "solid"
                      }}
                    >
                      <div>
                        <h2>Level 0</h2>
                      </div>

                      <div className="d-flex">
                        <div>
                          <h2>0</h2>
                        </div>{" "}
                        <div className="pl-4">
                          Rewards point
                          <br /> earned all time
                        </div>
                      </div>

                      <div className="d-flex">
                        <div>
                          <h2>0</h2>
                        </div>{" "}
                        <div className="pl-4">
                          Rewards point
                          <br /> earned today
                        </div>
                      </div>

                      <div className="d-flex">
                        <div>
                          <h2>0 of 7</h2>
                        </div>{" "}
                        <div className="pl-4">
                          Questions answered
                          <br /> correctly today
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div
                      className="col-xl-6 col-lg-6 col-md-12 col-12 order-first"
                      style={{ overflow: "hidden" }}
                    >
                      <div className="d-flex pb-4 pt-4">
                        <div style={{ flexBasis: 180 }}>
                          <h3>Reward</h3>
                          <p>Your latest Rewards</p>
                          <Button
                            variant="contained"
                            className={[classes.button, classes.buttonPrimary]}
                            type="submit"
                          >
                            View All Rewards
                          </Button>
                        </div>
                        <div>
                          <img
                            alt="img1"
                            src={require("./../images/rewards-1.png")}
                            width="70"
                            style={{ marginRight: 20 }}
                          />
                          <img
                            alt="img1"
                            src={require("./../images/rewards-2.png")}
                            width="70"
                            style={{ marginRight: 20 }}
                          />
                          <img
                            alt="img1"
                            src={require("./../images/rewards-3.png")}
                            width="70"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-xl-6 col-lg-6 col-md-12 col-12 order-first"
                      style={{ overflow: "hidden" }}
                    >
                      <div className="d-flex pb-4 pt-4">
                        <div style={{ flexBasis: 220 }}>
                          <h3>Achievements</h3>
                          <p>Your latest achievements</p>
                          <Button
                            variant="contained"
                            className={[classes.button, classes.buttonPrimary]}
                            type="submit"
                          >
                            View All Achievements
                          </Button>
                        </div>
                        <div>
                          <img
                            alt="img1"
                            src={require("./../images/certificates-1.png")}
                            width="70"
                            style={{ marginRight: 20 }}
                          />
                          <img
                            alt="img1"
                            src={require("./../images/certificates-2.png")}
                            width="70"
                            style={{ marginRight: 20 }}
                          />
                          <img
                            alt="img1"
                            src={require("./../images/certificates-3.png")}
                            width="70"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="c-dashboard col-md-12 mt-5">
                <div className="card col-md-12">
                  <div className="row">
                    <TabContainer history={this.props.history} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  //return bindActionCreators({actionCustomerAuth}, dispatch)
};
export default withStyles(combinedStyles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UsersDashboard)
);

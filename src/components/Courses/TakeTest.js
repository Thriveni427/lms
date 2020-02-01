import React, { Component } from "react";
import { connect } from "react-redux";
import { withFormik } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "@material-ui/core/Button";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import "date-fns";
import {
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

import combinedStyles from "../../material-ui";
import { actionStartTest } from "../../actions/TestPapers/actionStartTest";
import { actionSubmitTest } from "../../actions/TestPapers/actionSubmitTest";
import { actionGetCourseTopicList } from "../../actions/actionGetCourseTopicList";
import { actionCreateCourse } from "../../actions/actionCreateCourse";
import { actionSubmitCourseTest } from "../../actions/TestPapers/actionSubmitCourseTest";
import { actionStartTestByCourse } from "../../actions/TestPapers/actionStartTestByCourse";

export class TakeTest extends Component {
  state = {
    labelWidth: 0,
    fullWidth: true,
    selectedQuestion: [],
    index: 0,
    count: 300,
    hours: 0,
    minutes: 2,
    seconds: 59,
    open: false,
    activeProject: "",
    questionChecked: [],
    checked: false,
    callback: null,
    counter: 0,
    questionIndex: 0,
    QuestionIndex: 1,
    selectedQuestionNext: [],
    dataCreated: false,
    alertOpen: false,
  };

  componentDidMount = () => {
    let payload = { courseID: 1 };
    let CourseID = this.props.history.location.state.courseID;
    console.log(this.props.history.location.state);
    console.log(CourseID);
    this.props.actionStartTestByCourse(payload);
    // let payload = { "courseID": 104, "topicID": 72 };
    // this.props.actionStartTest(payload);
    this.timer()
  };


  timer = () => {
    this.myInterval = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds - 1
      }));

      if (this.state.minutes === 0 && this.state.seconds === 0) {
        console.log("This props : ", this.props);
        this.handleClickAlertOpen()
        // // alert("Time up")
        let payload = {
          courseID: this.props.history.location.state.courseID,
          userID: this.props.history.location.state.userId,
          answers: this.props.values.answers
        }
        console.log(payload);
        this.props.actionSubmitCourseTest(payload);
        this.redirectToResult()
      }

      if (this.state.seconds === 0) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          seconds: 60
        }));
      }

    }, 1000);
  }

  handlegoback = () => {
    this.props.history.goBack();
  }

  handleChange = event => {
    console.log(this.props);

    this.setState({ [event.target.name]: event.target.value });
    let ans = {
      questionID: this.props.startTestByCourseReducer.startTestByCourseData[this.state.questionIndex].QuestionID,
      questionName: this.props.startTestByCourseReducer.startTestByCourseData[this.state.questionIndex].QuestionName,
      answer: event.target.value,
      topicID: this.props.startTestByCourseReducer.startTestByCourseData[this.state.questionIndex].TopicID,
      topicName: this.props.startTestByCourseReducer.startTestByCourseData[this.state.questionIndex].TopicName
    };

    let arr = [];
    arr.push(...this.props.values.answers);
    arr.map((item) => {
      if (item.questionID === this.props.startTestByCourseReducer.startTestByCourseData[this.state.questionIndex].QuestionID) {
        item.answer = event.target.value;
      }
    });

    this.props.setValues({
      // ...this.props.values.answers,
      answers: arr
    });

    console.log(this.props);
    console.log(arr);
    console.log(ans);
  };

  handleoptionChange = event => {
    this.setState({ option: event.target.value });
  };

  handleCheck = () => {
    let arr2 = [];
    arr2.push(...this.state.questionChecked);
    arr2[this.state.questionIndex] = true;
    this.setState({
      questionChecked: arr2,
      checked: !this.state.checked
    });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
    this.props.setValues({
      ...this.props.values,
      selectedDate: date
    });
  };

  handleSelectQuestion = (e, i) => {
    // e.preventDefault();
    this.setState({
      // selectedQuestion: item,
      index: i,
      questionIndex: i
    });
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleCloseBtn = () => {
    this.setState({
      open: false
    });
  };

  handleClickAlertOpen = () => {
    this.setState({
      alertOpen: true
    });
  };

  handleCloseAlertBtn = () => {
    this.setState({
      alertOpen: false
    });
  };
  handlePrevious = () => {
    this.setState({ questionIndex: this.state.questionIndex - 1 });
  };

  handleNext = () => {
    this.setState({ questionIndex: this.state.questionIndex + 1 });
  };

  redirectToResult = () => {
    if (this.props.submitCourseTestReducer.submittedCourseTest === true) {
      this.props.submitCourseTestReducer.submittedCourseTest = false;
      this.props.history.push({
        pathname: "/TakeTestResult",
        state: {
          testID: this.props.submitCourseTestReducer.submitCourseTestData
        }
      });
    }
    console.log(this.props);
  };

  createPayload = data => {
    console.log(data);

    let arr = [];
    let arr2 = [];
    let ans = {};

    data.map((item) => {
      ans = {
        questionID: item.QuestionID,
        questionName: item.QuestionName,
        // answer: event.target.value,
        topicID: item.TopicID,
        topicName: item.TopicName
      };

      arr.push(ans);
      arr2.push(false);
    });

    this.props.setValues({
      ...this.props.values,
      answers: arr
    });

    this.setState(
      {
        questionChecked: arr2,
        dataCreated: true
      },
      console.log(this.state)
    );
    console.log(arr.questionName);
    console.log(this.props);
  };

  // componentDidUpdate() {
  //   // deprecated
  //   clearInterval(this.myInterval)
  // }
  render() {
    let userinfo = JSON.parse(sessionStorage.getItem("userinfo"));
    if (userinfo === null) userinfo = [];
    // console.log(userinfo)
    const { dataCreated } = this.state;
    // console.log(this.state.index);
    const {
      handleSubmit,
      classes,
      fullScreen,
    } = this.props;
    let {
      // startTestReducer,
      // submitTestReducer,
      // getCourseTopicListReducer,
      // submitCourseTestReducer,
      startTestByCourseReducer
    } = this.props;
    let startTestByCourseData = startTestByCourseReducer.startTestByCourseData;
    // let courseSubmitDetails = this.props.history.location.state;
    // console.log(courseSubmitDetails);

    if (startTestByCourseReducer.startedTestByCourse === true && dataCreated === false) {
      // startTestByCourseReducer.startedTestByCourse = false;

      this.createPayload(startTestByCourseReducer.startTestByCourseData);

      this.handleSelectQuestion(null, 0);
      // startTestByCourseReducer.startTestByCourseData[0] );
    }
    // console.log(startTestByCourseReducer.startTestByCourseData );

    // console.log(this.props.history.location.state);
    // console.log(submitCourseTestReducer.submitCourseTestData);
    if (this.props.submitCourseTestReducer.submittedCourseTest === true) {
      this.props.submitCourseTestReducer.submittedCourseTest = false;

      this.props.history.push({
        pathname: "/TakeTestResult",
        state: {
          testID: this.props.submitCourseTestReducer.submitCourseTestData
        }
      });
    }

    // if (startTestByCourseReducer.startedTestByCourse === true) {
    //   console.log(startTestByCourseData[this.state.questionIndex], " : ", startTestByCourseData[this.state.questionIndex].QuestionName)
    // }


    return (
      <React.Fragment>
        {
          startTestByCourseReducer.startedTestByCourse === true &&
          (
            (startTestByCourseData.length < 1)
              ?
              <h4>No Question here</h4>
              :
              (
                <div>
                  <div className="main_details_a mt-4">
                    <p className="course_name">
                      <strong >Course :</strong> {startTestByCourseData[this.state.questionIndex].CourseName}
                    </p>
                  </div>
                  <hr />
                  <div />
                  <div>
                    <div className="row">
                      <div className="col-md-3 ">
                        <div className="top_left">
                          <strong >{startTestByCourseReducer.startTestByCourseData.length} Questions</strong>
                          <strong>Total Marks : {startTestByCourseData[this.state.questionIndex].ScoreForCorrect * startTestByCourseReducer.startTestByCourseData.length}</strong>
                        </div>
                      </div>
                      <div className="col-md-4 timeleft_btn"><p>
                        {
                          this.state.minutes === 0 && this.state.seconds === 0 ?
                            <div>
                              <strong>Time Left</strong>:0:0

                              {/* {this.state.minutes + ":" + this.state.seconds} */}

                            </div> :
                            <div >
                              <strong>Time Left</strong>&nbsp;:&nbsp;

                              {this.state.minutes + ":" + this.state.seconds}

                            </div>
                        }
                        {/* <strong>Time left :</strong>{" "}
                        {this.state.minutes + ":" + this.state.seconds}{" "} */}
                      </p></div>
                      <div className="col-md-5 endtest_btn">
                        <Button variant="contained"
                          className={[classes.button, classes.buttonSecondary]}
                          onClick={this.handlegoback}>
                          End Test
                        </Button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <div className="card_a">
                          {/* <h3 className="quest">Question qnumber</h3> */}
                          <div>
                            {
                              startTestByCourseReducer.startTestByCourseData.map(
                                (item, i) => {
                                  return (
                                    <div>
                                      <div
                                        className="col_1"
                                        onClick={(e) => { this.handleSelectQuestion(e, i) }}
                                      >
                                        <div>
                                          <h6 className="questBg">
                                            {i + 1}. {item.QuestionName}
                                          </h6>
                                        </div>
                                        <div>
                                          {

                                            this.state.questionChecked[i] === true
                                              ?
                                              (
                                                <i
                                                  className="fa fa-check check_mark"
                                                  type="checkbox"
                                                  aria-hidden="true"
                                                />
                                              )
                                              :
                                              (
                                                <i
                                                  className="fa fa-ellipsis-h mr-3 dotmore"
                                                  aria-hidden="true"
                                                />
                                              )
                                          }
                                        </div>
                                      </div>
                                      <hr className="quest_hr" />
                                    </div>
                                  );
                                }
                              )
                            }
                          </div>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="card_a">
                          <div className="content">
                            <form noValidate autoComplete="off">
                              <div className="c-formSection">
                                <div className="c-formSections__grid">
                                  <div className="quest_no">
                                    <h6 className="questionLabel_a">Question {this.state.questionIndex + 1} of {startTestByCourseReducer.startTestByCourseData.length}</h6>
                                    <h6 className="questionLabel_b">Max. Marks: {startTestByCourseData[this.state.questionIndex].ScoreForCorrect}</h6>
                                  </div>
                                  <h6 className="questionLabel">
                                    {/* {startTestByCourseData[this.state.questionIndex].QuestionName} */}
                                    {
                                      startTestByCourseReducer.startedTestByCourse &&
                                      startTestByCourseData[this.state.questionIndex].QuestionName
                                    }
                                  </h6>
                                  <br />
                                  <div className="radio_field">
                                    <RadioGroup
                                      aria-label="option"
                                      name="answer"
                                      className={classes.group}
                                      value={this.state.option}
                                      onChange={this.handleChange}
                                      col>
                                      <FormControlLabel
                                        className="form-control input-group-lg select_option"
                                        onClick={this.handleCheck}
                                        value={startTestByCourseData[this.state.questionIndex].Option1}
                                        control={<Radio />}
                                        label={startTestByCourseData[this.state.questionIndex].Option1}
                                      />
                                      <FormControlLabel
                                        className="form-control input-group-lg select_option"
                                        onClick={this.handleCheck}
                                        value={startTestByCourseData[this.state.questionIndex].Option2}
                                        control={<Radio />}
                                        label={startTestByCourseData[this.state.questionIndex].Option2}
                                      />
                                      <FormControlLabel
                                        className="form-control input-group-lg select_option"
                                        onClick={this.handleCheck}
                                        value={startTestByCourseData[this.state.questionIndex].Option3}
                                        control={<Radio />}
                                        label={startTestByCourseData[this.state.questionIndex].Option3}
                                      />
                                      <FormControlLabel
                                        className="form-control input-group-lg select_option"
                                        onClick={this.handleCheck}
                                        value={startTestByCourseData[this.state.questionIndex].Option4}
                                        control={<Radio />}
                                        label={startTestByCourseData[this.state.questionIndex].Option4}
                                      />
                                    </RadioGroup>
                                  </div>
                                </div>
                              </div>
                              <div className="c-formSection next_prev_sub_btn">
                                <div className="prev_btn">
                                  {
                                    this.state.QuestionIndex === this.state.questionIndex + 1
                                      ?
                                      <Button
                                        disabled={this.props.startTestByCourseReducer.startTestByCourseData.length}
                                        variant="contained"
                                        onClick={() => this.handlePrevious()}
                                        className={[classes.button, classes.buttonPrimary]}>
                                        Previous
                                  </Button>
                                      :
                                      <Button
                                        variant="contained"
                                        onClick={() => this.handlePrevious()}
                                        className={[classes.button, classes.buttonPrimary]}>
                                        Previous
                                </Button>

                                  }
                                  {
                                    this.state.questionIndex + 1 === this.props.startTestByCourseReducer.startTestByCourseData.length
                                      ?
                                      <Button
                                        disabled={this.props.startTestByCourseReducer.startTestByCourseData.length}
                                        variant="contained"
                                        onClick={() => { this.handleNext() }}
                                        className={[classes.button, classes.buttonPrimary]}>
                                        Next
                                  </Button>
                                      :
                                      <Button

                                        variant="contained"
                                        onClick={() => { this.handleNext() }}
                                        className={[classes.button, classes.buttonPrimary]}>
                                        Next
                                  </Button>
                                  }
                                </div>
                                {
                                  this.state.answers
                                }
                                <div className="sub_btn">
                                  <Button
                                    variant="contained"
                                    className={[classes.button, classes.buttonPrimary]}
                                    // type="submit"
                                    onClick={this.handleClickOpen}
                                  >
                                    Submit Test
                                  </Button>
                                </div>
                              </div>


                              {/* <div className="sub_btn">
                                  <Button
                                    variant="contained"
                                    className={[classes.button, classes.buttonPrimary]}
                                    // type="submit"
                                    onClick={this.handleClickOpen}>
                                    Submit Test
                                  </Button>
                                </div> */}
                              <div>
                                <Dialog
                                  fullScreen={fullScreen}
                                  open={this.state.open}
                                  fullWidth={this.state.fullWidth}
                                  onClose={this.handleCloseBtn}
                                  aria-labelledby="responsive-dialog-title"
                                  className="dialog_width">
                                  <Button
                                    onClick={this.handleCloseBtn}
                                    style={{ position: "absolute", top: 0, right: 0 }}
                                    color="primary">
                                    <Icon>close</Icon>
                                  </Button>
                                  <DialogContent>
                                    <p className="typo">
                                      Are you sure you want to submit the Test?
                                    </p>
                                  </DialogContent>
                                  <DialogActions>
                                    <Button
                                      variant="contained"
                                      className={[classes.button, classes.buttonPrimary]}
                                      type="submit"
                                      color="primary"
                                      onClick={handleSubmit}>
                                      Yes
                                    </Button>
                                    <Button
                                      onClick={this.handleCloseBtn}
                                      variant="contained">
                                      No
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                              <div className="dialog_width_a">
                              <Dialog onClose={this.handleCloseAlertBtn} aria-labelledby="simple-dialog-title" open={this.state.alertOpen}>
                                {/* <Dialog
                                  fullScreen={fullScreen}
                                  open={this.state.alertOpen}
                                  fullWidth={this.state.fullWidth}
                                  onClose={this.handleCloseAlertBtn}
                                  aria-labelledby="responsive-dialog-title"
                                  className="dialog_width_b"
                                onClick = {this.handleClickAlertOpen()}
                                > */}
                                  {/* <Button
                                    onClick={this.handleCloseAlertBtn}
                                    style={{ position: "absolute", top: 0, right: 0 }}
                                    color="primary">
                                    <Icon>close</Icon>
                                  </Button> */}
                                  <DialogContent>
                                    <p className="time_up">
                                      Time Up..!!!
                                    </p>
                                  </DialogContent>
                                  {/* <DialogActions>
                                    <Button
                                      variant="contained"
                                      className={[classes.button, classes.buttonPrimary]}
                                      type="submit"
                                      color="primary"
                                      onClick={handleSubmit}>
                                      OK
                                    </Button>
                                  </DialogActions> */}
                                </Dialog>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )
        }
      </React.Fragment>
    );
  }
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // firstname: Yup.string().required('Please enter first name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    // middlename: Yup.string().required('Please enter middle name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    // lastname: Yup.string().required('Please enter last name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    // email: Yup.string().email('Please enter a valid email address')
    //   .required('Please enter email address'),
    // mobile: Yup.number('Mobile No must be numerical').required('Please enter personal mobile number'),
    // role: Yup.string().required('Please select role'),
    // vendor: Yup.string().required('Please select vendor'),
    // option: Yup.string().required('Please choose option'),
    // userStatus: Yup.string().required('Please select role status'),
    // bio: Yup.string().required('Please fill the description'),
  }),

  mapPropsToValues: () => ({
    // firstname: '',
    // middlename: '',
    // lastname: '',
    // email: '',
    // mobile: '',
    // role: '',
    // vendor: '',
    // option: '',
    // createdDate: '',
    // createdBy: '',
    // userStatus: '',
    // bio: ''
    answers: []
  }),

  handleSubmit: (payload, { props }) => {
    let data = {
      courseSubmitDetails: props.history.location.state
    };
    console.log(data.courseSubmitDetails.courseID);
    console.log(data.courseSubmitDetails.userId);

    payload["courseID"] = data.courseSubmitDetails.courseID;
    payload["userID"] = data.courseSubmitDetails.userId;

    console.log(payload);
    props.actionSubmitCourseTest(payload);
  },

  displayName: "TakeTest"
})(TakeTest);

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      actionStartTest,
      actionSubmitTest,
      actionStartTestByCourse,
      actionSubmitCourseTest,
      actionGetCourseTopicList,
      actionCreateCourse
    },
    dispatch
  );
};

const TakeTestForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default withRouter(withStyles(combinedStyles)(TakeTestForm));

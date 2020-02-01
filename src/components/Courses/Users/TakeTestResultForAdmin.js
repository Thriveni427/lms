
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
// import { PieChart, Pie } from 'recharts';
// import * as CanvasJSReact from './../../../js/canvasjs.react';


import combinedStyles from '../../../material-ui';
import { actionGetCurrentTestResult } from '../../../actions/Courses/User/actionGetCurrentTestResult';
import { actionGetAllTestResultsForAdmin } from '../../../actions/Courses/User/actionGetAllTestResultsForAdmin';
import { actionAddRemarksByAdmin } from '../../../actions/Courses/User/actionAddRemarksByAdmin';

// var CanvasJSChart = CanvasJSReact.default.CanvasJSChart;
// var CanvasJS = CanvasJSReact.default.CanvasJS;


class TakeTestResultForAdmin extends Component {
  state = {
    selectedQuestion: [],
    index: -1,
    open: false,
    submit: false,
    currentIndex: -1,
    newIndex: -1,
    size: '',
    comment: [],
    commentBox: false,
    savedTestID: -1,
  };

  componentDidMount = () => {

    let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
    console.log(userinfo);

    // let payload = {
    //   testId: this.props.history.location.state.testID,
    //   userId: userinfo.UserID
    // }
    // console.log(payload);

    // this.props.actionGetCurrentTestResult(payload);
    // console.log(this.props);

    this.props.actionGetAllTestResultsForAdmin();
    console.log(this.props);


  }
  handlerChange = (event) => {
    this.setState({
      size: event.target.value
    });
  }
  showCommentHandle = () => {
    this.setState({
      commentBox: !(this.state.commentBox),
      // qid: i
    })
  }
  handleChange = (index, event) => {
    console.log(index);
    event.preventDefault();
    if (this.state.currentIndex === index) {
      this.setState({
        currentIndex: -1
      })
    }
    else {
      this.setState({
        currentIndex: index,
      });
    }

  };

  adminHandleChange = (index, event) => {
    console.log(index);
    event.preventDefault();
    if (this.state.newIndex === index) {
      this.setState({
        newIndex: -1,
        comment: []
      })
    }
    else {
      this.setState({
        newIndex: index,
        comment: []
      });
    }

  };

  handlerSubmit = (event, testID) => {
    console.log(this.props);

    event.preventDefault();
    let payload = {
      testID: testID,
      // topicID: topicID, //this.props.history.location.state.testID,
      remarks: this.state.comment,
      remarkedBy: 1
    }
    console.log(" : ", payload);
    // this.props.actionAddRemarksByAdmin(payload);
  }

  handleCommentChange = (e, testID, id, topicID, topicName) => {
    e.preventDefault();
    let myRemarks = [];
    let perTopic = {
      TopicID: topicID,
      TopicName: topicName,
      Comments: e.target.value
    };
    if (this.state.comment.length > 0) {
      myRemarks.push(...this.state.comment)
    }
    myRemarks.push(perTopic);
    if (id === this.state.newIndex) {
      this.setState({
        comment: myRemarks,
        savedTestID: testID
      }, () => { console.log(this.state.comment) })
    }
    else {
      this.setState({
        comment: myRemarks,
        savedTestID: testID
      }, () => { console.log(this.state.comment) })
    }
  }

  render() {

    let { index, currentIndex, newIndex, commentBox } = this.state;
    const { classes } = this.props;
    const { getAllTestResultsForAdminReducer, addRemarksByAdminReducer } = this.props;
    console.log(getAllTestResultsForAdminReducer.allTestResultsForAdminData);

    console.log(addRemarksByAdminReducer.addedRemarksByAdminData);


    let topicSetArray = [];


    if (getAllTestResultsForAdminReducer.fetchedTestResultsForAdmin === true && topicSetArray.length === 0) {

      getAllTestResultsForAdminReducer.allTestResultsForAdminData.map((tests) => {
        let topicSet = new Set();

        tests.Correct.map((item) => {
          topicSet.add(item.TopicID); return null;
        })
        tests.InCorrect.map((item) => {
          topicSet.add(item.TopicID); return null;
        })
        tests.UnAnswered.map((item) => {
          topicSet.add(item.TopicID); return null;
        })
        console.log("topicSet inside map : ", topicSet);
        topicSetArray.push(topicSet);
        console.log("topicSetArray inside map : ", topicSetArray);

      })

    }

    console.log("topicSetArray : ", topicSetArray);

    console.log("getAllTestResultsForAdminReducer :", getAllTestResultsForAdminReducer);


    // let temp = [];

    let questionsTopicWiseArray = [];

    if (getAllTestResultsForAdminReducer.fetchedTestResultsForAdmin === true && topicSetArray.length > 0) {


      topicSetArray.map((topicSet, testIndex) => {  // main map for tests
        let questionsTopicWise = [];
        let topics = [];
        for (let item of topicSet)
          topics.push(item);

        console.log(testIndex, " : ", getAllTestResultsForAdminReducer.allTestResultsForAdminData[testIndex]);
        console.log("topics : ", topics);

        topics.map((id, topicIndex) => {  //  topics map

          let p = getAllTestResultsForAdminReducer.allTestResultsForAdminData[testIndex].Correct.filter(function (x) {
            return x.TopicID === id;
          })
          let correct = p.length;
          p = p.map(obj => ({ ...obj, type: 'correct' }));

          console.log("p : ", p);

          let q = getAllTestResultsForAdminReducer.allTestResultsForAdminData[testIndex].InCorrect.filter(function (x) {
            return x.TopicID === id;
          })
          let incorrect = q.length;
          q = q.map(obj => ({ ...obj, type: 'incorrect' }));

          console.log("q : ", q);

          let r = getAllTestResultsForAdminReducer.allTestResultsForAdminData[testIndex].UnAnswered.filter(function (x) {
            return x.TopicID === id;
          })
          let unanswered = r.length;
          r = r.map(obj => ({ ...obj, type: 'unanswered' }));

          console.log("r : ", r);

          // console.log(topicIndex);
          let topicName = ((p.length > 0) ? p[0].TopicName : ((q.length > 0) ? q[0].TopicName : r[0].TopicName));
          console.log("topicName : ", topicName);
          let n = [];
          n.push(...p, ...q, ...r);

          let percentage = (correct / (correct + incorrect + unanswered)) * 100;
          let result;

          console.log("percentage : ", percentage);

          if (percentage <= 30) {
            // console.log("fail")
            result = "Too bad";
          }
          else if (percentage > 30 && percentage < 50) {
            result = "Bad";
          }
          else if (percentage >= 50 && percentage < 70) {
            result = "Good";
          }
          else if (percentage >= 70 && percentage < 90) {
            result = "Excellent";
          }
          else if (percentage >= 90) {
            result = "Outstanding";
          }
          else {
            result = "Superman";
          }

          questionsTopicWise.push({ name: topicName, data: n, topicID: n[0].TopicID, remark: result });
          console.log("topicIndex : ", topicIndex, "id : ", id, " : ", "questionsTopicWise : ", questionsTopicWise, "n : ", n);

        })
        questionsTopicWiseArray.push({ data: questionsTopicWise, testID: getAllTestResultsForAdminReducer.allTestResultsForAdminData[testIndex].TestID, name: getAllTestResultsForAdminReducer.allTestResultsForAdminData[testIndex].Name });
      })



      console.log("questionsTopicWiseArray : ", questionsTopicWiseArray);
    }



    return (
      <React.Fragment>
        <div className="c-contentHeader c-primaryBG--light u-BorderLight pb-6">
          {/* <ToastContainer autoClose={2000} /> */}
          <div className="container-fluid">
            <div className="header-body">
              <div className="row align-items-center py-4">
                <div className="col-lg-6 col-6">
                  <h6 className="c-breadcrumb text-white d-inline-block mb-0">Home > Review Test Result</h6>
                </div>
                <div className="col-lg-6 col-6 text-right">
                </div>
              </div>
            </div>
          </div>
        </div>
      <div className="container-fluid mt--6">
        <div className="row">
        <div className="col">
        <div className="card">
          <div className="card-header d-flex align-items-center border-0"> 
             {/* className="col-md-12 mb-3"> */}
             <div className="col-lg-6 col-6">
                    <h3 className="margin-0 padding-0">Review Test Result</h3>
                  </div>
            {/* <h3 className="mt-3" align="center">Review Test Result</h3> */}
          </div>


        </div>
        </div>
        </div>
        <React.Fragment>
          {
            getAllTestResultsForAdminReducer.allTestResultsForAdminData.map((resultItem, coIndex) => {
              console.log(resultItem);

              return (
                <ExpansionPanel
                  square
                  className="mt-1 mb-1"
                  expanded={newIndex === coIndex ? true : false}
                  onChange={(event) => { this.adminHandleChange(coIndex, event) }}
                >
                  <ExpansionPanelSummary className="row">
                    <Typography className="col-md-12" key={index}>
                      <div className="collapseExpansion">
                        <div className="topicNameForAdmin">
                          <p><strong>Course : </strong>{resultItem.Name}</p>
                        </div>
                        <div className="topicNameForAdmin">
                          <p><strong>User : </strong>{resultItem.FirstName}</p>
                        </div>
                        <div className="topicNameForAdmin">
                          <p><strong>TestID : </strong>{resultItem.TestID}</p>
                        </div>
                      </div>
                    </Typography>
                  </ExpansionPanelSummary>
                  <hr className="under_line" />
                  <ExpansionPanelDetails>
                    <form className="percentage_result mb-4" onSubmit={(event) => { this.handlerSubmit(event, resultItem.TestID) }}>
                      <Fragment>
                        <div className="container-fluid">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="card">
                                <Fragment>
                                  <div>
                                    <div className="percentage_result mt-2">
                                      <div className="">
                                        <div className="text_Result">
                                          <div>
                                            <p className="quesjustName ">Percentage : </p>
                                          </div>
                                          <div className="nameFirst">
                                            <p>{resultItem.Percentage} %</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="mr-4">
                                        <div className="text_Result">
                                          <div>
                                            <h5 className="mar_lefTopic">Result : </h5>
                                          </div>
                                          <div className="nameFirst1">
                                            <p>{resultItem.Result} </p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="quesU">
                                    <div className="ml-3 mr-3 mt-2">
                                      {
                                        console.log(questionsTopicWiseArray[coIndex])
                                      }
                                      {


                                        (questionsTopicWiseArray === null || questionsTopicWiseArray === undefined || (questionsTopicWiseArray.length) < 1)
                                          ?
                                          null
                                          :
                                          (
                                            // topic loop
                                            questionsTopicWiseArray[coIndex].data.map((topics, topicIndex) => {
                                              console.log(topics);
                                              return (
                                                <ExpansionPanel
                                                  square
                                                  className={"mt-1 mb-1"}
                                                  expanded={currentIndex === topicIndex ? true : false}
                                                  onChange={(event) => { this.handleChange(topicIndex, event) }}
                                                >
                                                  <ExpansionPanelSummary>
                                                    <Typography key={index}>
                                                      <div className="topicName">
                                                        <p>Topic name : {topics.name} </p>
                                                      </div>
                                                    </Typography>
                                                  </ExpansionPanelSummary>
                                                  <hr className="under_line" />
                                                  {
                                                    topics.data.map((question, i2) => {
                                                      console.log(question, i2)
                                                      return (
                                                        <ExpansionPanelDetails>
                                                          <Fragment>
                                                            <div className={"main_par " + question.type}>
                                                              <div>
                                                                <h6 className="quesBst" >
                                                                  {i2 + 1}. {question.QuestionName}
                                                                </h6>
                                                              </div>
                                                              <div className="ans_ForQue">
                                                                <div className="text_Result">
                                                                  <div>
                                                                    <h6 className="quesjustName mt-2">Correct Answer : </h6>
                                                                  </div>
                                                                  <div className="nameFirstAns">
                                                                    <p>{question.CorrectAnswer}</p>
                                                                  </div>
                                                                </div>
                                                                {
                                                                  (question.type === 'correct') &&
                                                                  (
                                                                    <div className="text_Result">
                                                                      <div>
                                                                        <h6 className="correct_ans mt-2">Your Answer : </h6>
                                                                      </div>
                                                                      <div className="user_Ans">
                                                                        <p>{question.UserAnswer}</p>
                                                                      </div>
                                                                    </div>
                                                                  )
                                                                }
                                                                {
                                                                  (question.type === 'incorrect') &&
                                                                  (
                                                                    <div className="text_Result">
                                                                      <div>
                                                                        <h6 className="your_ans mt-2">Your Answer : </h6>
                                                                      </div>
                                                                      <div className="user_AnsIncorrect">
                                                                        <p>{question.UserAnswer}</p>
                                                                      </div>
                                                                    </div>
                                                                  )
                                                                }
                                                                {
                                                                  (question.type === 'unanswered') &&
                                                                  (
                                                                    <div className="user_notAns">
                                                                      <p>You didn't answer</p>
                                                                    </div>
                                                                  )
                                                                }

                                                              </div>
                                                            </div>
                                                          </Fragment>
                                                        </ExpansionPanelDetails>
                                                      )

                                                    })
                                                  }

                                                  <Fragment>
                                                    <FormControl component="fieldset" className="ml-5" onClick={() => this.showCommentHandle()}>
                                                      <RadioGroup
                                                        // aria-label="gender"
                                                        // name="gender1"
                                                        className={classes.group}
                                                        // text={this.state.value}
                                                        onChange={(event) => { this.handlerChange(event) }}
                                                      >
                                                        <div className="radio_btns">
                                                          <div><FormControlLabel className="pos_btn" value="positive" checked={this.state.size === "positive"} control={<Radio />} label="Positive" /></div>
                                                          <div><FormControlLabel value="nagative" checked={this.state.size === "nagative"} control={<Radio />} label="Negative" /></div>
                                                        </div>
                                                      </RadioGroup>
                                                    </FormControl>
                                                    {commentBox ?
                                                      // <form className="percentage_result mb-4" onSubmit={(event) => { this.handlerSubmit(event, resultItem.TestID, topics.topicID) }}>
                                                      <Fragment>
                                                        <div>
                                                          <textarea className="ml-5" rows="3" cols="120" id="comment" ></textarea>
                                                        </div>
                                                        <div align="end" className="mb-3 mr-4">
                                                          <Button
                                                            style={{ marginTop: 10 }}
                                                            variant="contained"
                                                            className={[classes.button, classes.buttonPrimary]}
                                                            type="submit"
                                                            onClick={(e) => { this.handleCommentChange(e, resultItem.TestID, topics.topicID, topics.name) }}
                                                          // onClick={(event) => { this.handlerSaveComment(event, resultItem.TestID, topics.topicID) }}
                                                          >
                                                            Save
                                                          </Button>
                                                        </div>
                                                      </Fragment>
                                                      //  </form>
                                                      :
                                                      null
                                                    }
                                                  </Fragment>
                                                </ExpansionPanel>

                                              )
                                            })
                                          )
                                      }
                                    </div>
                                  </div>

                                  <div className="mb-4">
                                    <h5 className="ml-3 mt-4" style={{ fontSize: 16 }}>Test Summary</h5>
                                    <div className="text_Result">
                                      <div>
                                        <p className="quesjustName ">Total questions : </p>
                                      </div>
                                      <div className="nameFirst">
                                        <p>{resultItem.TotalQuestions}</p>
                                      </div>
                                    </div> <div className="text_Result">
                                      <div>
                                        <p className="quesjustName ">Correct questions : </p>
                                      </div>
                                      <div className="nameFirst">
                                        <p>{resultItem.TotalCorrect}</p>
                                      </div>
                                    </div>
                                    <div className="text_Result">
                                      <div>
                                        <p className="quesjustName ">Incorrect questions : </p>
                                      </div>
                                      <div className="nameFirst">
                                        <p>{resultItem.TotalInCorrect}</p>
                                      </div>
                                    </div> <div className="text_Result">
                                      <div>
                                        <p className="quesjustName ">Unanswered questions : </p>
                                      </div>
                                      <div className="nameFirst">
                                        <p>{resultItem.TotalUnAnswered}</p>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="col-md-12 mb-4" align="center">
                                  <Link to="/courses">
                                    <Button
                                      style={{ marginTop: 10 }}
                                      variant="contained"
                                      className={[classes.button, classes.buttonPrimary]}
                                      type="submit"
                                    >
                                      Go To My Courses
                                                </Button>
                                  </Link>
                                </div> */}
                                </Fragment>

                                {console.log(questionsTopicWiseArray)}
                                {questionsTopicWiseArray.map((tests) => {
                                  console.log(tests)
                                })}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <Button
                            style={{ marginTop: 10 }}
                            variant="contained"
                            className={[classes.button, classes.buttonPrimary]}
                            type="submit"
                          // onClick={(event) => { this.handlerSaveComment(event, resultItem.TestID, topics.topicID) }}
                          >
                            Submit
                          </Button>
                        </div>
                      </Fragment>
                    </form>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            }
            )
          }

        </React.Fragment>
      </div>
          </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return state
}

export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, { actionGetCurrentTestResult, actionGetAllTestResultsForAdmin, actionAddRemarksByAdmin })(TakeTestResultForAdmin)))

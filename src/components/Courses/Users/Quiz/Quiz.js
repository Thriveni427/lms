import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';

import combinedStyles from '../../../../material-ui';
import { actionGetQuestions } from '../../../../actions/Courses/User/actionGetQuestions'


const CheckboxesGroup = (props) => {
  const { data, handleCheckboxChange } = props;
  return (
    <React.Fragment>  {console.log(data)}
      <h3>{data.QuestionName}</h3>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              //checked={data.Option1}
              onChange={handleCheckboxChange(data.Option1, data.QuestionID)}
              value={data.Option1}
            />
          }
          label={data.Option1}
        />

        <FormControlLabel
          control={
            <Checkbox
              //checked={data.Option2}
              onChange={handleCheckboxChange(data.Option2, data.QuestionID)}
              value={data.Option2}
            />
          }
          label={data.Option2}
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={data.Option3}
              onChange={handleCheckboxChange(data.Option3, data.QuestionID)}
              value={data.Option3}
            />
          }
          label={data.Option3}
        />
        <FormControlLabel
          control={
            <Checkbox
              //checked={data.Option4}
              onChange={handleCheckboxChange(data.Option4, data.QuestionID)}
              value={data.Option4}
            />
          }
          label={data.Option4}
        />
      </FormGroup>
    </React.Fragment>
  )
}


export class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gilad: true,
      jason: false,
      antoine: false,
      counter: 0,
      flag: false,
      answers: [],
    }
  }

  handlePrevious = () => {
    if (this.state.counter > 0)
      this.setState({ counter: this.state.counter - 1 });
  };
  handleNext = () => {
    // this.increaseQuizzes()
    console.log(this.props.getQuestionsReducer.questions.length);
    if (this.state.counter !== this.props.getQuestionsReducer.questions.length - 1)
      this.setState({ counter: this.state.counter + 1 });
  };
  // increaseQuizzes = () => {
  //   let data = this.props.getQuestionsReducer.questions;
  //   let counter = parseInt(this.state.counter);
  //   let currentItem = data[counter]
  //   console.log(currentItem);
  //   //this.setState({ counter: this.state.counter + 1 });
  // }
  componentDidMount = () => {
    // this.increaseQuizzes();
    let reqQuery = {
      courseID: this.props.history.location.state.courseDetail.CourseID,
      questionPaperID: this.props.questionPaperID
    }
    console.log(reqQuery)
    this.props.actionGetQuestions(reqQuery)
    this.setState({ flag: true });
  }
  getQuestions = () => {
    let reqQuery = {
      courseID: this.props.history.location.state.courseDetail.CourseID,
      questionPaperID: this.props.questionPaperID
    }
    console.log(reqQuery)
    this.props.actionGetQuestions(reqQuery)
  }
  handleCheckboxChange = (name, qid) => event => {
    let obj = []; let pld;
    pld = {
      questionID: qid,
      answer: name
    }
    obj.push(...this.state.answers, pld);
    this.setState({ [name]: event.target.checked, answers: obj });
    console.log(this.state);
  };

  handleRadioChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {

    // console.log(this.state)
    const { getQuestionsReducer, classes, handleSubmit } = this.props;
    let questions = getQuestionsReducer.questions;
    if (questions === undefined) questions = [];
    let { counter } = this.state;
    console.log(counter)
    console.log(questions[counter]);
    return (
      <React.Fragment>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <div>
            {
              // b = questions.find((item) => item.QuestionType === 'Multiple Choice')
              ((getQuestionsReducer.fetchedQuestions === true) ?
                <CheckboxesGroup
                  key={counter}
                  handleCheckboxChange={this.handleCheckboxChange}
                  data={questions[counter]}
                />
                : <div>No question available</div>)
            }
          </div>
          <div className="c-formSection pt-4 pb-4">
            <Button
              variant="contained"
              onClick={() => this.handlePrevious()}
              className={[classes.button, classes.buttonSecondary]}
            >
              Previous
    </Button>
            <Button
              variant="contained"
              onClick={() => this.handleNext()}
              className={[classes.button, classes.buttonSecondary]}
            >
              Next
    </Button>
            <Button
              variant="contained"
              //onClick={() => this.handleSubmit()}
              className={[classes.button, classes.buttonPrimary]}
              type="submit"
            >
              Submit
    </Button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    // categoryName: Yup.string().required('Please enter first name').matches(/^[A-Za-z\s '-]+$/, { message : "Only characters and spaces are allowed" , excludeEmptyString: false }),
    // categoryID: Yup.string().required('Please select Parent')
  }),
  mapPropsToValues: () => ({

    //upgradelevel2: "",
  }),
  handleSubmit: (payload, { props, state }) => {
    let userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
    if (userinfo === null) userinfo = [];
    payload["userID"] = ( (userinfo.userType === "learner") ? userinfo.UserID : null );
    payload["questionPaperID"] = props.questionPaperID;
    payload["courseID"] = props.history.location.state.courseDetail.CourseID;
    payload["answer"] = state.answers;
      console.log(payload);
    //props.actionSetGamification(payload);
    //actions.resetForm();  ||
  },

  displayName: 'Quiz',
})(Quiz);

const mapStateToProps = state => {
  return state;
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ actionGetQuestions }, dispatch)
}
const QuizForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer)

export default withRouter(withStyles(combinedStyles)(connect(mapStateToProps, mapDispatchToProps)(QuizForm)
))
